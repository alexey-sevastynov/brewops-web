import { VoidFunc } from "@/shared/types/getter-setter-functions";
import { AuthModeKey, authModeKeys } from "@/modules/auth/enums/auth-mode-key";

export function isSignInMode(mode: string) {
    return mode === authModeKeys.signIn;
}

export function isSignUpMode(mode: string) {
    return mode === authModeKeys.signUp;
}

export function toggleAuthMode(setAuthMode: VoidFunc<AuthModeKey>, currentAuthMode: AuthModeKey) {
    setAuthMode(getToggledAuthMode(currentAuthMode));
}

export function getAuthModeLabel(mode: AuthModeKey) {
    if (isSignInMode(mode)) return "Вхід";

    if (isSignUpMode(mode)) return "Реєстрація";

    return "";
}

export function getInitialAuthMode(modeParam?: string) {
    if (modeParam && isSignUpMode(modeParam)) {
        return authModeKeys.signUp;
    }

    return authModeKeys.signIn;
}

function getToggledAuthMode(currentMode: AuthModeKey) {
    return isSignInMode(currentMode) ? authModeKeys.signUp : authModeKeys.signIn;
}
