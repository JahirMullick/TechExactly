import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontSize } from "../../constants";



interface CustomToastProps {
  text1?: string;
  text2?: string;
  props?: {
    bgColor?: string;
    showButton?: boolean;
    buttonLabel?: string;
    onButtonPress?: () => void;
    onClose?: () => void;
  };
}


// Base Custom Toast Component
const CustomToast: React.FC<CustomToastProps> = ({ text1, text2, props }) => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{text1 || "Notification"}</Text>
        {props?.onClose && (
          <TouchableOpacity onPress={props.onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Body Section */}
      <View style={[styles.body, props?.bgColor && { backgroundColor: props.bgColor }]}>
        {text2 ? <Text style={styles.message}>{text2}</Text> : null}

        {/* Optional Button */}
        {props?.showButton && props?.buttonLabel && (
          <TouchableOpacity
            style={styles.button}
            onPress={props?.onButtonPress}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>{props.buttonLabel}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};


// Error Toast Component
export const ErrorToast: React.FC<CustomToastProps> = ({ text1, text2, props }) => {
  return (
    <View style={styles.container}>
      {/* Error Header */}
      <View style={[styles.header, styles.errorHeader]}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.headerTitle}>{text1 || "Error"}</Text>
        {props?.onClose && (
          <TouchableOpacity onPress={props.onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Body Section */}
      <View style={[styles.body, props?.bgColor && { backgroundColor: props.bgColor }]}>
        {text2 ? <Text style={styles.message}>{text2}</Text> : null}

        {props?.showButton && props?.buttonLabel && (
          <TouchableOpacity
            style={[styles.button, styles.errorButton]}
            onPress={props?.onButtonPress}
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, styles.errorButtonText]}>{props.buttonLabel}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};


// Success Toast Component
export const SuccessToast: React.FC<CustomToastProps> = ({ text1, text2, props }) => {
  return (
    <View style={styles.container}>
      {/* Success Header */}
      <View style={[styles.header, styles.successHeader]}>
        <Text style={styles.successIcon}>✓</Text>
        <Text style={styles.headerTitle}>{text1 || "Success"}</Text>
        {props?.onClose && (
          <TouchableOpacity onPress={props.onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Body Section */}
      <View style={[styles.body, props?.bgColor && { backgroundColor: props.bgColor }]}>
        {text2 ? <Text style={styles.message}>{text2}</Text> : null}

        {props?.showButton && props?.buttonLabel && (
          <TouchableOpacity
            style={[styles.button, styles.successButton]}
            onPress={props?.onButtonPress}
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, styles.successButtonText]}>{props.buttonLabel}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};


// Warning Toast Component
export const WarningToast: React.FC<CustomToastProps> = ({ text1, text2, props }) => {
  return (
    <View style={styles.container}>
      {/* Warning Header */}
      <View style={[styles.header, styles.warningHeader]}>
        <Text style={styles.warningIcon}>⚠️</Text>
        <Text style={[styles.headerTitle, styles.warningHeaderTitle]}>{text1 || "Warning"}</Text>
        {props?.onClose && (
          <TouchableOpacity onPress={props.onClose} style={styles.closeButton}>
            <Text style={[styles.closeText, styles.warningCloseText]}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Body Section */}
      <View style={[styles.body, props?.bgColor && { backgroundColor: props.bgColor }]}>
        {text2 ? <Text style={styles.message}>{text2}</Text> : null}

        {props?.showButton && props?.buttonLabel && (
          <TouchableOpacity
            style={[styles.button, styles.warningButton]}
            onPress={props?.onButtonPress}
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, styles.warningButtonText]}>{props.buttonLabel}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};


// Info Toast Component
export const InfoToast: React.FC<CustomToastProps> = ({ text1, text2, props }) => {
  return (
    <View style={styles.container}>
      {/* Info Header */}
      <View style={[styles.header, styles.infoHeader]}>
        <Text style={styles.headerTitle}>{text1 || "Info"}</Text>
        {props?.onClose && (
          <TouchableOpacity onPress={props.onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Body Section */}
      <View style={[styles.body, props?.bgColor && { backgroundColor: props.bgColor }]}>
        {text2 ? <Text style={styles.message}>{text2}</Text> : null}

        {props?.showButton && props?.buttonLabel && (
          <TouchableOpacity
            style={[styles.button, styles.infoButton]}
            onPress={props?.onButtonPress}
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, styles.infoButtonText]}>{props.buttonLabel}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // Base Header
  header: {
    backgroundColor: "#2F5A62", // Dark teal - primary theme color
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: FontSize.Size.medium_1x,
    fontWeight: "700",
    flex: 1,
    marginLeft: 8,
  },

  // Error Header - using coral for errors
  errorHeader: {
    backgroundColor: "#e6311dff", // Coral - error/warning color
    // backgroundColor: "red", // Coral - error/warning color
  },
  errorIcon: {
    fontSize: 24,
  },

  // Success Header - using mint green
  successHeader: {
    backgroundColor: "green", // Mint green - success color
    // backgroundColor: "#8FCDB5", // Mint green - success color
  },
  successIcon: {
    fontSize: FontSize.Size.medium_3x,
    // color: "#2F5A62", // Dark teal icon for contrast
    color: "white",
    fontWeight: "700",
  },

  // Warning Header - using darker coral shade
  warningHeader: {
    backgroundColor: "#e6311dff",
    // backgroundColor: "#F18F84", // Coral - same as error
  },
  warningIcon: {
    fontSize: FontSize.Size.medium_3x,
    color: "#FFFFFF",
  },
  warningHeaderTitle: {
    color: "#FFFFFF",
    fontSize: FontSize.Size.medium_1x
  },
  warningCloseText: {
    color: "#FFFFFF",
    fontSize: FontSize.Size.small_5xl
  },

  // Info Header - using dark teal
  infoHeader: {
    backgroundColor: "#2F5A62", // Dark teal - primary theme color
  },

  // Close Button
  closeButton: {
    padding: 4,
  },
  closeText: {
    color: "#FFFFFF",
    fontSize: FontSize.Size.small_5xl,
    fontWeight: "600",
  },

  // Body
  body: {
    backgroundColor: "white",
    // paddingVertical: hp(3),
    // minHeight: hp(10),
    paddingHorizontal: 16,
  },
  message: {
    color: "#2F5A62", // Dark teal text for readability
    fontSize: FontSize.Size.small_3x,
    marginVertical: 16,
    lineHeight: 20,
  },

  // Base Button
  button: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#2F5A62", // Dark teal border
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#2F5A62", // Dark teal text
    fontSize: 16,
    fontWeight: "600",
  },

  // Error Button
  errorButton: {
    borderColor: "#F18F84", // Coral border
  },
  errorButtonText: {
    color: "#F18F84", // Coral text
  },

  // Success Button
  successButton: {
    borderColor: "#8FCDB5", // Mint green border
  },
  successButtonText: {
    color: "#2F5A62", // Dark teal text for better contrast
  },

  // Warning Button
  warningButton: {
    borderColor: "#F18F84", // Coral border
  },
  warningButtonText: {
    color: "#F18F84", // Coral text
  },

  // Info Button
  infoButton: {
    borderColor: "#2F5A62", // Dark teal border
  },
  infoButtonText: {
    color: "#2F5A62", // Dark teal text
  },
});


export default CustomToast;
