import { useState, useCallback } from 'react';
import supabase from '../services/supabase/supabase';

interface ForgotPasswordState {
    loading: boolean;
    error: string | null;
    success: boolean;
}

interface ForgotPasswordReturn extends ForgotPasswordState {
    sendOTP: (email: string) => Promise<boolean>;
    verifyOTP: (email: string, otp: string) => Promise<boolean>;
    resetPassword: (newPassword: string) => Promise<boolean>;
    clearError: () => void;
}

export const useForgotPassword = (): ForgotPasswordReturn => {
    const [state, setState] = useState<ForgotPasswordState>({
        loading: false,
        error: null,
        success: false,
    });

    // Step 1: Send OTP to email
    const sendOTP = useCallback(async (email: string): Promise<boolean> => {
        setState({ loading: true, error: null, success: false });

        try {
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new Error('Please enter a valid email address');
            }

            // Send OTP via Supabase
            const { error  } = await supabase.auth.signInWithOtp({
                email: email.toLowerCase().trim(),
                options: {
                    shouldCreateUser: false, // Don't create new user, only send to existing
                },
            });

            if (error) {
                throw error;
            }

            console.log('✅ OTP sent successfully to:', email);

            setState({
                loading: false,
                error: null,
                success: true,
            });

            return true;
        } catch (error: any) {
            console.error('Send OTP Error:', error);

            let errorMessage = 'Failed to send OTP';

            if (error.message?.includes('User not found')) {
                errorMessage = 'No account found with this email';
            } else if (error.message) {
                errorMessage = error.message;
            }

            setState({
                loading: false,
                error: errorMessage,
                success: false,
            });

            return false;
        }
    }, []);

    // Step 2: Verify OTP
    const verifyOTP = useCallback(async (email: string, otp: string): Promise<boolean> => {
        setState({ loading: true, error: null, success: false });

        try {
            // Validate OTP format (6 digits)
            if (!/^\d{6}$/.test(otp)) {
                throw new Error('OTP must be 6 digits');
            }

            // Verify OTP with Supabase
            const { data, error } = await supabase.auth.verifyOtp({
                email: email.toLowerCase().trim(),
                token: otp,
                type: 'email',
            });

            if (error) {
                throw error;
            }

            if (!data.session) {
                throw new Error('Invalid OTP or OTP expired');
            }

            console.log('✅ OTP verified successfully');

            setState({
                loading: false,
                error: null,
                success: true,
            });

            return true;
        } catch (error: any) {
            console.error('Verify OTP Error:', error);

            let errorMessage = 'Invalid or expired OTP';

            if (error.message?.includes('expired')) {
                errorMessage = 'OTP has expired. Please request a new one';
            } else if (error.message?.includes('invalid')) {
                errorMessage = 'Invalid OTP. Please check and try again';
            } else if (error.message) {
                errorMessage = error.message;
            }

            setState({
                loading: false,
                error: errorMessage,
                success: false,
            });

            return false;
        }
    }, []);

    // Step 3: Reset Password (after OTP verification)
    const resetPassword = useCallback(async (newPassword: string): Promise<boolean> => {
        setState({ loading: true, error: null, success: false });

        try {
            // Validate password strength
            // if (newPassword.length < 6) {
            //     throw new Error('Password must be at least 6 characters long');
            // }

            // Update password
            const { error } = await supabase.auth.updateUser({
                password: newPassword,
            });

            if (error) {
                throw error;
            }

            console.log('✅ Password reset successfully');

            // Sign out after password reset (user must login with new password)
            await supabase.auth.signOut();

            setState({
                loading: false,
                error: null,
                success: true,
            });

            return true;
        } catch (error: any) {
            console.error('Reset Password Error:', error);

            let errorMessage = 'Failed to reset password';

            if (error.message?.includes('weak')) {
                errorMessage = 'Password is too weak. Use a stronger password';
            } else if (error.message) {
                errorMessage = error.message;
            }

            setState({
                loading: false,
                error: errorMessage,
                success: false,
            });

            return false;
        }
    }, []);

    // Clear error
    const clearError = useCallback(() => {
        setState(prev => ({ ...prev, error: null }));
    }, []);

    return {
        ...state,
        sendOTP,
        verifyOTP,
        resetPassword,
        clearError,
    };
};
