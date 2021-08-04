## Ignews


### Como receber o evento do webhook do stripe localmente
- Instalar a CLI do stripe -> https://stripe.com/docs/stripe-cli#install
- Testar para verificar se já está disponível do ambiente
> stripe -h 

- Realizar o login 
> stripe login

- Ativar a CLI para receber o evento e redirecionar para nossa api local
> stripe listen --forward-to localhost:3000/api/webhook
