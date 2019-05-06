export declare enum RoundingModes {
    /**
     * Rounding mode to round towards positive infinity.
     */
    CEILING = 0,
    /**
     * Rounding mode to round towards zero.
     */
    DOWN = 1,
    /**
     * Rounding mode to round towards negative infinity.
     */
    FLOOR = 2,
    /**
     * Rounding mode to round towards "nearest neighbor" unless both neighbors are equidistant,
     * in which case round down.
     */
    HALF_DOWN = 3,
    /**
     * Rounding mode to round towards the "nearest neighbor" unless both neighbors are equidistant,
     * in which case, round towards the even neighbor.
     */
    HALF_EVEN = 4,
    /**
     * Rounding mode to round towards "nearest neighbor" unless both neighbors are equidistant,
     * in which case round up.
     */
    HALF_UP = 5,
    /**
     * Rounding mode to assert that the requested operation has an exact result, hence no rounding is necessary.
     * UNIMPLEMENTED
     */
    UNNECESSARY = 6,
    /**
     * Rounding mode to round away from zero.
     */
    UP = 7
}
