import bcrypt from 'bcryptjs'
const Users = [
    {
        name: 'Ridham Virani',
        email: 'ridhamvirani123@gmail.com',
        password: bcrypt.hashSync('Ridham@123', 12),
        isAdmin: true
    },
    {
        name: 'Jenil Virani',
        email: 'jenilvirani@gmail.com',
        password: bcrypt.hashSync('', 12),
        isAdmin: true
    }

]
export default Users