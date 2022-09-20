/**
 * @swagger
 * tags:
 *  name: Containers
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    Container:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: nombre del contenedor
 *        transportCost:
 *          type: number
 *          description: Costo de transporte
 *        containerPrice:
 *          type: number
 *          description: Valor del contenedor
 *      example:
 *        name: C1,
 *        transportCost: 4744.33,
 *        containerPrice: 571.40
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    Error:
 *      type: string
 *      example: 'No hay contenedores!'
 */
/**
 * @swagger
 * tags:
 *  name: Stats
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    FinalStat:
 *      type: object
 *      properties:
 *        budget_used:
 *          type: number
 *          description: Total de los presupuestos
 *        containers_dispatched:
 *          type: number
 *          description: Total de los contenedores despachados
 *        containers_not_dispatched:
 *          type: number
 *          description: Total de los contenedores NO despachados
 *      example:
 *        containers_dispatched: 36509031.32,
 *        containers_not_dispatched: 3294532.45,
 *        budget_used: 554987.20
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    status:
 *      type: number
 *      example: 200
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    msg:
 *      type: string
 *      example: '* @apiSuccess'
 */
