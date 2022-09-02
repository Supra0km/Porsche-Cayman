import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post("/register", "AuthController.register")
Route.post("/login", "AuthController.login")
Route.group(() => {
  Route.resource("Aulas", "AulasController").apiOnly()
}).middleware('auth')