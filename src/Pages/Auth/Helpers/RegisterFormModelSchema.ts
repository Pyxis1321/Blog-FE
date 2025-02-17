import { z } from "zod";
import { TranslationResources } from "../../../Translations/EnglishTranslation";

export const createRegisterFormModelSchema = (t: (key: string) => string) =>
  z
    .object({
      login: z.string({
        required_error: t(TranslationResources.Auth.Form.required),
      }),
      email: z.string({
        required_error: t(TranslationResources.Auth.Form.required),
      }),
      password: z
        .string({
          required_error: t(TranslationResources.Auth.Form.required),
        })
        .min(6, {
          message: t(
            TranslationResources.Auth.Form.Validation.PasswordRules
              .passwordMinLength
          ),
        })
        .regex(/\d/, {
          message: t(
            TranslationResources.Auth.Form.Validation.PasswordRules
              .passwordDigit
          ),
        })
        .regex(/[a-z]/, {
          message: t(
            TranslationResources.Auth.Form.Validation.PasswordRules
              .passwordLowercase
          ),
        })
        .regex(/[A-Z]/, {
          message: t(
            TranslationResources.Auth.Form.Validation.PasswordRules
              .passwordUppercase
          ),
        })
        .regex(/[^a-zA-Z0-9]/, {
          message: t(
            TranslationResources.Auth.Form.Validation.PasswordRules
              .passwordSpecialCharacter
          ),
        }),
      confirmPassword: z.string({
        required_error: t(TranslationResources.Auth.Form.required),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t(
        TranslationResources.Auth.Form.Validation.passwordsNotMatching
      ),
      path: ["confirmPassword"],
    });
