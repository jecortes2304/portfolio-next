
export function getEnvsEmail() {
    return {
        serviceId: process.env.NEXT_PUBLIC_SERVICE_ID,
        templateId: process.env.NEXT_PUBLIC_TEMPLATE_ID,
        userId: process.env.NEXT_PUBLIC_USER_ID
    }
}

export function getEnvsSecrets() {
    return {
        jwtSecret: process.env.JWT_SECRET,
    }
}

export function getEnvsMongo() {
    return {
        mongodbUser: process.env.MONGODB_USER,
        mongodbPassword: process.env.MONGODB_URI,
        mongodbServer: process.env.MONGODB_PASSWORD,
        mongodbPort: process.env.MONGODB_PORT,
        mongodbDatabaseName: process.env.MONGODB_DB_NAME,
        mongodbUri: process.env.MONGODB_URI as string
    }
}

export function getEnvsAdmin() {
    return {
        username: process.env.ADMIN_USERNAME,
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
    }
}