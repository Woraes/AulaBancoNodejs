import { Request, Response } from 'express';
import { Op } from 'sequelize'; // importar para poder usar o OP.Or


import { Product } from '../models/Product';
import { User } from '../models/User';

export const home = async (req: Request, res: Response)=>{
        //build  + save 
       // const user = User.build({
            //id: 15,
            //name:'Fulaninha 20',
            //age: 25
       // });

        //conversão nascimento para idade
       // let idade: number = 27;
        //user.age = idade;
      // await user.save(); //para salvar no banco o novo usuario

        //Usando o create
        //const createuser = await User.create({
            //id:0,
           // name: 'Fulano 2',
          //  age: 102
      // });






  let users = await User.findAll({//para listar os item do banco
    //where:{name:'will'}// busca somente oq for definido podendo colocar mais de uma condição typo name: "valor", age:'30'
   /* where:{    //segunda forma de fazer uma filtragem em busca
    [Op.or]:[
        {age:37},
        {name:'will'}
    ]
    }*/
    where:{  // filtarndo por >= a 18
        age:{
       [Op.gte]:1
        }
    },
    order:[
        //[ 'age', 'ASC'],
        ['name', 'ASC']   
        ] ,   // colocando em ordem alfabetica irdenação ASC cresente DESC decresente

        //limitando resultados numeros de paginas e quantidade a ser exibida
        offset:0,  // qntos vai pular por pagina
        limit: 30  //qntos vai exibir
  });



    // let age: number = 90;
    // let showOld: boolean = false;

    // if(age > 50) {
    //     showOld = true;
    // }

    // let list = Product.getAll();
    // let expensiveList = Product.getFromPriceAfter(12);

    res.render('pages/home', {
        name: 'Bonieky',
        lastName: 'Lacerda',
        //showOld,
        //products: list,
        //expensives: expensiveList,
        frasesDoDia: [],
        users
    });
};

export const novoUsuario = async (req: Request, res: Response) =>{
    let {name, age} = req.body;

    if(name) {
        const newUser = User.build({ name});

        if (age){
            newUser.age = parseInt(age);
        }
        await newUser.save();
    }
    res.redirect('/');
}