"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Title } from "@/shared/ui/typography/title/Title";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { getSearchParam } from "@/shared/utils/search-params";
import { searchParamKeys } from "@/shared/constants/search-param-keys";
import {
    getAuthModeLabel,
    getInitialAuthMode,
    isSignInMode,
    isSignUpMode,
    toggleAuthMode,
} from "@/modules/auth/components/auth-form/AuthForm.funcs";
import { AuthFormActions } from "@/modules/auth/components/auth-form/auth-form-actions/AuthFormActions";
import { AuthModeKey, authModeKeys } from "@/modules/auth/enums/auth-mode-key";
import { AuthFormSignIn } from "@/modules/auth/components/auth-form/auth-form-sign-in/AuthFormSignIn";
import { AuthFormSignUp } from "@/modules/auth/components/auth-form/auth-form-sign-up/AuthFormSignUp";
import { clearAuthError } from "@/modules/auth/model/slice";

export function AuthForm() {
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const modeParam = getSearchParam(searchParams, searchParamKeys.mode);
    const emailParam = getSearchParam(searchParams, searchParamKeys.email);
    const tokenParam = getSearchParam(searchParams, searchParamKeys.token);

    const [authMode, setAuthMode] = useState<AuthModeKey>(getInitialAuthMode(modeParam));

    useEffect(() => {
        if (modeParam && isSignUpMode(modeParam)) {
            // TODO: temporary workaround — avoid setState inside effect warning; refactor initialization logic
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setAuthMode(authModeKeys.signUp);
        }
    }, [modeParam]);

    const onToggleAuthMode = useCallback(() => {
        dispatch(clearAuthError());
        toggleAuthMode(setAuthMode, authMode);
    }, [authMode, dispatch]);

    return (
        <>
            <Title className="text-foreground">{getAuthModeLabel(authMode)}</Title>
            {isSignInMode(authMode) ? (
                <AuthFormSignIn authMode={authMode} defaultEmail={emailParam} />
            ) : (
                <AuthFormSignUp defaultEmail={emailParam} invitationToken={tokenParam} />
            )}
            <AuthFormActions authMode={authMode} toggleAuthMode={onToggleAuthMode} />
        </>
    );
}
