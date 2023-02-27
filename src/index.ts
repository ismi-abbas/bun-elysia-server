import { Elysia, type Context } from 'elysia'
import { swagger } from '@elysiajs/swagger'

const app = new Elysia()

app.use(swagger())

app.get('/', () => 'Hello Elysia')

app.get('/abbas', () => { name: 'Abbas' })

app.post('login', ({ body, set }: { body: any, set: Context['set'] }) => {
    if (body.username !== 'abbas' && body.password !== '123456') {
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

})


app.listen(3000, () => {
    console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
})

