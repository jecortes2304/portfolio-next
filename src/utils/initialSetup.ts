import Role from '@/models/rol'
import User from '@/models/user'
import { ConstantsRoles } from  '@/utils/constants'
import { getEnvsAdmin } from "@/config/settings";
import connectDB from "@/utils/mongo";


export async function createRoles(): Promise<void> {
    try {
        await connectDB()

        const count = await Role.estimatedDocumentCount();
        if (count > 0) return;

        const values = await Promise.all([
            new Role({
                name: ConstantsRoles.ADMIN.role,
                permissions: ConstantsRoles.ADMIN.permissions
            }).save(),
            new Role({
                name: ConstantsRoles.GUEST.role,
                permissions: ConstantsRoles.GUEST.permissions
            }).save()
        ]);
        console.log(`Roles successfully created ${values}`)
    } catch (error) {
        console.error(`Error creating Roles ${error}`)
    }
}

export async function createAdminUser  (): Promise<void> {
    try {
        await connectDB()
        const role = await Role.findOne({name: ConstantsRoles.ADMIN.role});
        const {username, name, email, password} = getEnvsAdmin()
        const isUsernameExist = await User.findOne({username: username});
        if (!isUsernameExist) {
            const adminUser = new User({
                username: username,
                name: name,
                email: email,
                password: password,
                role: role
            });
            await adminUser.save()
            console.log(`Root user successfully created`)
        }
    } catch (error) {
        console.error(`Error creating Root user ${error}`)
    }
}