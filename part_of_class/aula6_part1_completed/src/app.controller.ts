import { Controller, Get, Query, Delete } from '@nestjs/common';
import { ProductClient } from './clients/ProductClient';
import UserClient from './clients/UserClient';

@Controller()
export class AppController {
  private productClient:ProductClient;
  private userClient:UserClient;

  public constructor() {
      this.productClient = ProductClient.getInstance();
      this.userClient = UserClient.getInstance();
  }
/**
   * Endpoit que recebe o nome de um cliente
   * 
   * Busca a informação de usuário na UserClient
   * Trabalha a informação para isolar o nome e a senha deste cliente
   * 
   * Passa essas informações na ProductClient para autenticar
   * returna o array da product cliente
   */
@Get('access_products')
public async accessProduct(@Query('name') name: string) {
  const {email, password} = await this.getUserInformation(name);

  await this.productClient.authenticationProcess(
    email,
    password
  );

  return (await this.productClient.products()).data;
}


@Delete('delete_product_price200')
public async deleteProduct(@Query('name') name: string) {
  let response = [];

  const {email, password} = await this.getUserInformation(name);

  await this.productClient.authenticationProcess(
    email,
    password
  );

  await this.productClient.authenticationProcess(
    email,
    password
  );

  (await this.productClient.products()).data.forEach(async (element) => {
    if (element.price == '200.00') {
      response.push(await this.productClient.destroyer(element.id))
    }
  });

  return response;
}

private async getUserInformation(name) {
  const resultOfUserClient = await this.userClient.find(name);

  const conditionToStattThisProces = resultOfUserClient && 
                                      resultOfUserClient.users && 
                                      resultOfUserClient.users.length > 0;

  if (!conditionToStattThisProces) {
    return {
      msg: 'User not found'
    }
  }
  
  const email = resultOfUserClient.users[0].email
  const password = resultOfUserClient.users[0].password

  return {email, password}
}

}