import {
    TnsOAuthClient,
    configureTnsOAuth,
    ITnsOAuthTokenResult
} from "nativescript-oauth2";
import {
    TnsOaProvider,
    TnsOaProviderOptionsGoogle,
    TnsOaProviderGoogle,
} from "nativescript-oauth2/providers";

export function configureOAuthProviders() {
    const googleProvider = configureOAuthProviderGoogle();
    configureTnsOAuth([googleProvider]);
}

export function configureOAuthProviderGoogle(): TnsOaProvider {
    const googleProviderOptions: TnsOaProviderOptionsGoogle = {
        openIdSupport: "oid-full",
        clientId:
            "52111376902-k105g9nophs5plgi29vd120nmqomrp51.apps.googleusercontent.com",
        redirectUri:
            "com.googleusercontent.apps.52111376902-k105g9nophs5plgi29vd120nmqomrp51:/auth",
        urlScheme:
            "com.googleusercontent.apps.52111376902-k105g9nophs5plgi29vd120nmqomrp51",
        scopes: ["email"]
    };
    const googleProvider = new TnsOaProviderGoogle(googleProviderOptions);
    return googleProvider;
}