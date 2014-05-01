# Sliding Menu

## Description:

Sliding Menu is a plugin which allows you to add a mobile sliding menu, easily!

## Usage:

Initialise Sliding Menu:

    <script>
    $(document).ready(function(){
      $('.my-button').slidingMenu($('.my-menu'), {
        transitionDuration: '0.3s',
        direction: 'left' // or right
      });
    });
    </script>
