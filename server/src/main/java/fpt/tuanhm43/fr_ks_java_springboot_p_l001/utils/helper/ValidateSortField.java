package fpt.tuanhm43.fr_ks_java_springboot_p_l001.utils.helper;

public final class ValidateSortField {

    private ValidateSortField() {
        // prevent instantiation
    }

    /**
     * Validate sort field against allowed fields.
     */
    public static String validate(String sortBy, String... allowedFields) {
        for (String field : allowedFields) {
            if (field.equals(sortBy)) {
                return sortBy;
            }
        }
        return allowedFields[allowedFields.length - 1];
    }
}
