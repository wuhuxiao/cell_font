$(document).ready(function () {
  // typing animation
  (function ($) {
    $.fn.writeText = function (content) {
      var contentArray = content.split(""),
        current = 0,
        elem = this;
      setInterval(function () {
        if (current < contentArray.length) {
          elem.text(elem.text() + contentArray[current++]);
        }
      }, 80);
    };
  })(jQuery);

  // input text for typing animation
  $("#holder").writeText("WEB DESIGNER + FRONT-END DEVELOPER");

  // initialize wow.js
  new WOW().init();

  // Push the body and the nav over by 285px over
  var main = function () {
    train()

    $(".fa-bars").click(function () {
      $(".nav-screen").animate(
        {
          right: "0px"
        },
        200
      );

      $("body").animate(
        {
          right: "285px"
        },
        200
      );
    });

    // Then push them back */
    $(".fa-times").click(function () {
      $(".nav-screen").animate(
        {
          right: "-285px"
        },
        200
      );

      $("body").animate(
        {
          right: "0px"
        },
        200
      );
    });

    $(".nav-links a").click(function () {
      $(".nav-screen").animate(
        {
          right: "-285px"
        },
        500
      );

      $("body").animate(
        {
          right: "0px"
        },
        500
      );
    });
  };

  $(document).ready(main);

  // initiate full page scroll

  $("#fullpage").fullpage({
    scrollBar: true,
    responsiveWidth: 400,
    navigation: true,
    navigationTooltips: ["home", "modelExe", "portfolio", "contact", "connect"],
    anchors: ["home", "modelExe", "portfolio", "contact", "connect"],
    menu: "#myMenu",
    fitToSection: false,

    afterLoad: function (anchorLink, index) {
      var loadedSection = $(this);

      //using index
      if (index == 1) {
        /* add opacity to arrow */
        $(".fa-chevron-down").each(function () {
          $(this).css("opacity", "1");
        });
        $(".header-links a").each(function () {
          $(this).css("color", "white");
        });
        $(".header-links").css("background-color", "transparent");
      } else if (index != 1) {
        $(".header-links a").each(function () {
          $(this).css("color", "black");
        });
        $(".header-links").css("background-color", "white");
      }

      //using index
      if (index == 2) {
        /* animate skill bars */
        $(".skillbar").each(function () {
          $(this)
            .find(".skillbar-bar")
            .animate(
              {
                width: $(this).attr("data-percent")
              },
              2500
            );
        });
      }
    }
  });

  // move section down one
  $(document).on("click", "#moveDown", function () {
    $.fn.fullpage.moveSectionDown();
  });

  // fullpage.js link navigation
  $(document).on("click", "#skills", function () {
    $.fn.fullpage.moveTo(2);
  });

  $(document).on("click", "#projects", function () {
    $.fn.fullpage.moveTo(3);
  });

  $(document).on("click", "#contact", function () {
    $.fn.fullpage.moveTo(4);
  });
  var socket
  // web socket
  var train = function(){
    socket = io.connect('http://localhost:8080/test');
    socket.on('connect response', function(msg) {
      console.log('connected',msg.data);
      $('#log')[0].innerText = msg.data
      //  ;
    });
    var Epoch = ''
    var Step = ''
    var Loss = ''
    var old = ''
    socket.on('train cnn', function(msg) {
      let data = msg.data
      console.log(data);
      let show = old
      if (data.indexOf("[..............................]") != -1) {
        Step = data.slice(0,9)
      }else if(data.indexOf("ETA") != -1) {
        Loss = data
        if (Epoch=='') {
          Epoch = localStorage.getItem('Epoch');
        }
        show = Epoch+'-'+Step+Loss
      }else if(data.indexOf("Epoch") != -1) {
        Epoch = data
        localStorage.setItem('Epoch', Epoch);
      }else if(data.indexOf("") != -1) {
        show = old
      } else{
        show = data
      }
      $('#log')[0].innerText = show
      old = show
      // if (data.indexOf("loss") != -1):
      //   $('#log')[0].innerText = data
      
      //  ;
    });
    
    // 向服务器通信
    // $('form#emit').submit(function(event) {
    //     socket.emit('my event', {data: $('#emit_data').val()});
    //     return false;
    // });
    // $('form#broadcast').submit(function(event) {
    //     socket.emit('my broadcast event', {data: $('#broadcast_data').val()});
    //     return false;
    // });
  }

  $(document).on("click", "#train", function () {
    var MaxLength = $("#MaxLength")[0].value
    // var WordVectorType = $("#WordVectorType")[0].value
    var WordVectorType =  "word2vec"
    
    var EmbeddingSize = $("#EmbeddingSize")[0].value
    var BatchSize = $("#BatchSize")[0].value
    var Epochs = $("#Epochs")[0].value
    console.log(WordVectorType);
    // console.log('MaxLength',MaxLength);
    // console.log('WordVectorType',WordVectorType);
    // console.log('EmbeddingSize',EmbeddingSize);
    // console.log('BatchSize',BatchSize);
    // console.log('Epochs',Epochs);
    socket.emit('train cnn', {data: [MaxLength,WordVectorType,EmbeddingSize,BatchSize,Epochs]});
    
    // var url = `http://localhost:8080/trainCNNModel?MaxLength=${MaxLength}&WordVectorType=${WordVectorType}&EmbeddingSize=${EmbeddingSize}&BatchSize=${BatchSize}&Epochs=${Epochs}`
    // console.log('url',url);
    // $.ajax({
    //   type: "GET",
    //   url: url
    // })
    //   .done(function (response) {
        
    //   })
    //   .fail(function (data) {
       
    //   });
  });
  
  // smooth scrolling
  $(function () {
    $("a[href*=#]:not([href=#])").click(function () {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          $("html,body").animate(
            {
              scrollTop: target.offset().top
            },
            700
          );
          return false;
        }
      }
    });
  });

  //ajax form
  $(function () {
    // Get the form.
    var form = $("#ajax-contact");

    // Get the messages div.
    var formMessages = $("#form-messages");
    $("#result")[0].innerHTML = ''
    // Set up an event listener for the contact form.
    $(form).submit(function (e) {
      // Stop the browser from submitting the form.
      e.preventDefault();

      // Serialize the form data.
      var formData = $(form).serialize();
      console.log(formData);
      // Submit the form using AJAX.
      $.ajax({
        type: "GET",
        url: 'http://localhost:8080/getCommentSenti',
        data: formData
      })
        .done(function (response) {
          // Make sure that the formMessages div has the 'success' class.
          $(formMessages).removeClass("error");
          $(formMessages).addClass("success");

          // Set the message text.
          $("#result")[0].innerHTML = response
        })
        .fail(function (data) {
          // Make sure that the formMessages div has the 'error' class.
          $(formMessages).removeClass("success");
          $(formMessages).addClass("error");

        });
    });
  });
});