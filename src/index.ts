import { Elysia, type Context } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { schema } from '../utils/loginSchema'


const app = new Elysia()

app.use(swagger())

app.get('/', () => 'Hello Elysia')

app.get('/abbas', () => { name: 'Abbas' })

app.post('/login', ({ body, set }: { body: any, set: Context['set'] }) => {
    try {
        const { username, password } = schema.parse(body)
        if (username !== 'abbas' && password !== '123456') {
            set.status = 401
            return {
                status: '200',
                message: 'Login successful'
            }
        } else {
            set.status = 401
            return {
                status: '401',
                message: 'Login failed'
            }
        }
    } catch (error: any) {
        set.status = 400
        return {
            status: '400',
            message: JSON.parse(error)
        }
    }

})


app.listen(3000, () => {
    console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
})

