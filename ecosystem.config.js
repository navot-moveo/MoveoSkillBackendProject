module.exports = {
  apps : [{
    name: 'API',
    script: './bin/www',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      key:'/Users/navotslavin/Desktop/moveo/first-key-pair-aws.pem',
      user : 'ubuntu',
      host : 'ec2-34-245-143-131.eu-west-1.compute.amazonaws.com',
      ref  : 'origin/master',
      repo : 'git@github.com:navot-moveo/MoveoSkillBackendProject.git',
      path : '/home/ubuntu/app',
      'post-deploy' : 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
};
