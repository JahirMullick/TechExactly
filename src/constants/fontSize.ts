
export const Size = Object.freeze({
    extraSmall_1x: 2,
    extraSmall_2x: 4,
    extraSmall_3x: 6,
    extraSmall_4x: 8,

    small_1x: 10,
    small_1xl: 11,
    small_2x: 12,
    small_2xl: 13,
    small_3x: 14,
    small_3xl: 15,
    small_4x: 16,
    small_5x: 18,
    small_5xl: 19,

    medium_1x: 20,
    medium_2x: 22,
    medium_3x: 24,
    medium_4x: 26,
    medium_5x: 28,

    large_1x: 30,
    large_2x: 32,
    large_3x: 34,
    large_4x: 36,
    large_5x: 38,

    extraLarge_1x: 40,
    extraLarge_2x: 42,
    extraLarge_3x: 44,
    extraLarge_4x: 46,
    extraLarge_5x: 48,
    extraLarge_6x: 50,

    doubleExtraLarge_1x: 60,
})


// Export type for Size keys
export type SizeKey = keyof typeof Size;