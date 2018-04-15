module.exports = {
    development: {
        username: 'ayufnetsbuwuah',
        password: 'fb1cbc0917be35967a7271dfd7fbcfc25c64c1b39b628f56cae90a4412d73b09',
        database: 'd69spiktuk7vb3',
        host: 'ec2-54-225-200-15.compute-1.amazonaws.com',
        dialect: 'postgresql',
        dialectOptions: {
            ssl:true
        }
    },
    test: {
        dialect: "sqlite",
        storage: ":memory:"
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOSTNAME,
        dialect: 'postgresql',
    },
    
        'secret': 'supersecret'
      
};