module.exports = {
  apps : [{
    name: 'Moveo App',
    script: 'app.js',

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
      user : 'ubuntu',
      host : '34.244.23.98',
      key:'/Users/navotslavin/Desktop/moveo/first-key-pair-aws.pem',
      ref  : 'origin/master',
      repo : 'git@github.com:navot-moveo/MoveoSkillBackendProject.git',
      path : '/home/ubuntu/moveo',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
