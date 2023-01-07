export interface Config {
    nest: NestConfig;
    cors: CorsConfig;
    // swagger: SwaggerConfig;
    // graphql: GraphqlConfig;
    security: SecurityConfig;
}

export interface NestConfig {
    port: number;
}

export interface CorsConfig {
    enabled: boolean;
}

export interface SecurityConfig {
    expiresIn: string;
    refreshIn: string;
    bcryptSaltOrRound: string | number;
}
