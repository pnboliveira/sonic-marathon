  $(document).ready(function () {
      set_twitch_stream_status();
      $('.scrollspy').scrollSpy();
      $('.sidenav').sidenav();
      $('.parallax').parallax();
      $('.dropdown-trigger').dropdown();


      var isMobile = {
          Android: function () {
              return navigator.userAgent.match(/Android/i);
          },
          BlackBerry: function () {
              return navigator.userAgent.match(/BlackBerry/i);
          },
          iOS: function () {
              return navigator.userAgent.match(/iPhone|iPad|iPod/i);
          },
          Opera: function () {
              return navigator.userAgent.match(/Opera Mini/i);
          },
          Windows: function () {
              return navigator.userAgent.match(/IEMobile/i);
          },
          any: function () {
              return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
          }
      };

      

      function set_twitch_stream_status() {
          $.ajax({
              type: 'GET',
              url: 'https://api.twitch.tv/helix/streams',
              dataType: 'json',
              headers: {
                  'Client-ID': 'ADD_CLIENT_ID_HERE'
              },
              data: {
                  'user_id': '21827740'
              },
              error: set_twitch_offline,
              success: function (response) {
                  if (!response || !response['data'] || response['data'].length == 0) {
                      set_twitch_offline();
                      return;
                  }
                  if (isMobile.any()) {
                      set_twitch_stream_status_mobile(response['data'][0]['game_id']);
                  } else {
                      set_twitch_stream_status_cont(response['data'][0]['game_id']);
                  }

              }
          });
      }
      
      

      function set_twitch_stream_status_cont(game_id) {
          $.ajax({
              type: 'GET',
              url: 'https://api.twitch.tv/helix/games',
              dataType: 'json',
              headers: {
                  'Client-ID': 'ADD_CLIENT_ID_HERE'
              },
              data: {
                  'id': game_id
              },
              error: set_twitch_offline,
              success: function (response) {
                  if (!response || !response['data'] || response['data'].length == 0) {
                      set_twitch_offline();
                      return;
                  }

                  jQuery('#stream').append('<div class="container"><div class="row"><div class="col s12 m12 l12"><h3><b>Live Feed</b></h3><hr /></div></div><div><div class="row center"><div class="col m8 l8 hide-on-small-only"><div class="video-container"><iframe src="https://player.twitch.tv/?channel=respawnpoint" frameborder="0" height="378" width="100%"></iframe></div></div><div class="col m4 l4 hide-on-small-only"><iframe src="https://www.twitch.tv/respawnpoint/chat?popout=" frameborder="0" scrolling="no" height="440" width="100%"></iframe></div></div></div></div>')
              }
          })
      }

      function set_twitch_stream_status_mobile(game_id) {
          $.ajax({
              type: 'GET',
              url: 'https://api.twitch.tv/helix/games',
              dataType: 'json',
              headers: {
                  'Client-ID': 'ADD_CLIENT_ID_HERE'
              },
              data: {
                  'id': game_id
              },
              error: set_twitch_offline,
              success: function (response) {
                  if (!response || !response['data'] || response['data'].length == 0) {
                      set_twitch_offline();
                      return;
                  }

                  jQuery('#stream').append('<div class="container"><div class="row"><div class="col s12 m12 l12"><h3><b>Live Feed</b></h3><hr /></div></div><div class="section scrollspy"><div class="row center"><div class="col s12"><div class="video-container"><iframe src="https://player.twitch.tv/?channel=respawnpoint" frameborder="0" height="378" width="100%"></iframe></div></div><div class="col s12">&nbsp;</div><div class="col s12"><h4>Join in the conversation over at <a href="https://www.twitch.tv/respawnpoint" target="_blank">our Twitch page!</a></h4></div></div></div></div>')
              }
          })
      }

      function set_twitch_offline() {
          var countDownDate = new Date("Feb 10, 2018 21:00:00 GMT").getTime();

          // Update the count down every 1 second
          var x = setInterval(function () {

              // Get todays date and time
              var now = new Date().getTime();

              // Find the distance between now an the count down date
              var distance = countDownDate - now;

              // Time calculations for days, hours, minutes and seconds
              var days = Math.floor(distance / (1000 * 60 * 60 * 24));
              var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
              var seconds = Math.floor((distance % (1000 * 60)) / 1000);

              // Display the result in the element with id="demo"
              document.getElementById("demo").innerHTML ="<b>"+ days + "</b> day(s), <b>" + hours + "</b> hour(s), <b>" +
                  minutes + "</b> minute(s) and <b>" + seconds + "</b> second(s) left to go fast! ";

              // If the count down is finished, write some text 
              if (distance < 0) {
                  clearInterval(x);
                  document.getElementById("demo").innerHTML = "Thank you for watching! See you next time.";
              }
          }, 1000);
      }
  });
