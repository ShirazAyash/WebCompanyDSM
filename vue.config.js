module.exports = {
    devServer: {
      proxy: {
        '^/api': {
          target: 'https://deliverysystemmanagement.herokuapp.com',
          changeOrigin: true
        },
      }
    },
   
    
  };
  
