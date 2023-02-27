import { Elysia, type Context, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = new Elysia()

app.use(swagger())

app.get('/', () => {
    return {
        status: '200',
        message: 'Welcome to Elysia'
    }
})

app.post('/signup', ({ body, set }: {
    body: any, set: Context['set']
}) => {
    const { username, email } = body
    prisma.users.create({
        data: {
            username,
            email,
        }
    }).then((user) => {
        console.log({ user })
        set.status = 200
        return {
            status: '200',
            message: 'User created successfully',
            user: user
        }
    }).catch((err) => {
        console.log({ err })
        set.status = 401
        return {
            status: '401',
            message: 'User creation failed'
        }
    })
}, {
    schema: {
        body: t.Object({
            username: t.String(),
            email: t.String()
        })
    }
})


app.listen(3000, () => {
    console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
})

