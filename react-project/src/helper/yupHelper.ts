import React from "react";
import {IPhone} from "../model/IPhone";

export const useYupValidationResolver = (validationSchema: any) =>
    React.useCallback(
        async (data: any) => {
            try {
                const values = await validationSchema.validate(data, {
                    abortEarly: false,
                });
                return {
                    values,
                    errors: {},
                };
            } catch (errors: any) {
                return {
                    values: {},
                    errors: errors.inner.reduce(
                        (allErrors: any, currentError: any) => ({
                            ...allErrors,
                            [currentError.path]: {
                                type: currentError.type ?? "validation",
                                message: currentError.message,
                            },
                        }),
                        {}
                    ),
                };
            }
        },
        [validationSchema]
    );