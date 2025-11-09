function recipesPlugin (app, opts, next) {
  app.addHook('onRequest', async function isChef (request, reply) {
    app.log.info('Running global onRequest hook from recipes.js');
    if (request.headers['x-api-key'] !== 'fastify-rocks') {
      reply.code(401);
      throw new Error('Invalid API key');
    }
  });

  app.get('/menu', { handler: menuHandler });
  app.get('/recipes', { handler: menuHandler });
  // app.register(async function protectRoutesPlugin (plugin, opts) {
  //   plugin.addHook('onRequest', app.authOnlyChef);
  //   plugin.post('/recipes', async function addToMenu (request, reply) {
  //     throw new Error('Not implemented');
  //   });
  //   plugin.delete('/recipes/:id', function removeFromMenu (request, reply) {
  //     reply.send(new Error('Not implemented'));
  //   });
  // });

  const jsonSchemaBody = {
    type: 'object',
    required: ['name', 'country', 'order', 'price'],
    properties: {
      name: { type: 'string', minLength: 3, maxLength: 50 },
      country: { type: 'string', enum: ['ITA', 'IND'] },
      description: { type: 'string' },
      order: { type: 'number', minimum: 0, maximum: 100 },
      price: { type: 'number', minimum: 0, maximum: 50 }
    }
  };

  app.post('/recipes', {
    config: { auth: true },
    schema: {
      body: jsonSchemaBody
    },
    handler: async function addToMenu (request, reply) {
      // throw new Error('Not implemented');
      const { name, country, description, order, price } = request.body;
      const newPlateId = await app.source.insertRecipe({
        name,
        country,
        description,
        order,
        price,
        createdAt: new Date()
      });

      reply.code(201);
      return { id: newPlateId };
    }
  });

  app.delete('/recipes/:id', {
    config: { auth: true },
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', minLength: 24, maxLength: 24 }
        }
      }
    },
    handler: async function removeFromMenu (request, reply) {
      // reply.send(new Error('Not implemented'));
      const { id } = request.params;
      const [recipe] = await app.source.readRecipes({ id });
      if (!recipe) {
        reply.code(404);
        throw new Error('Not found');
      }
      await app.source.deleteRecipe(id);
      reply.code(204);
    }
  });

  next();
}

async function menuHandler (request, reply) {
  this.log.info('Logging GET /menu from this');
  request.log.info('Logging GET /menu from request');
  reply.log.info('Logging GET /menu from reply');
  const recipes = await this.source?.readRecipes();
  return recipes;
}

export default recipesPlugin;
