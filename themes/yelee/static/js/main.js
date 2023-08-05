require([], function () {
    //
    // var rootUrl = yiliaConfig.rootUrl
    // var yiliaConfig = {
    //     rootUrl: '',
    //     animate: false,
    //     yiliaConfig: false,
    //     open_in_new: true,
    //     fancybox: true,
    // };

    var isMobileInit = false;
    var loadMobile = function () {
        require([yiliaConfig.rootUrl + 'js/mobile.js'], function (mobile) {
            mobile.init();
            isMobileInit = true;
        });
    }
    var isPCInit = false;
    var loadPC = function () {
        require([yiliaConfig.rootUrl + 'js/pc.js'], function (pc) {
            pc.init();
            isPCInit = true;
        });
    }

    var browser = {
        versions: function () {
            var u = window.navigator.userAgent;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者安卓QQ浏览器
                iPad: u.indexOf('iPad') > -1, //是否为iPad
                webApp: u.indexOf('Safari') == -1,//是否为web应用程序，没有头部与底部
                weixin: u.indexOf('MicroMessenger') == -1 //是否为微信浏览器
            };
        }()
    }

    $(window).bind("resize", function () {
        if (isMobileInit && isPCInit) {
            $(window).unbind("resize");
            return;
        }
        var w = $(window).width();
        if (w >= 700) {
            loadPC();
        } else {
            loadMobile();
        }
    });

    if (browser.versions.mobile === true || $(window).width() < 700) {
        loadMobile();
    } else {
        loadPC();
    }

    //是否使用fancybox
    if (yiliaConfig.fancybox === true) {
        require([yiliaConfig.rootUrl + 'fancybox/jquery.fancybox.js'], function (pc) {
            var isFancy = $(".isFancy");
            if (isFancy.length != 0) {
                var imgArr = $(".article-inner img");
                for (var i = 0, len = imgArr.length; i < len; i++) {
                    var src = imgArr.eq(i).attr("src");
                    var title = imgArr.eq(i).attr("alt");
                    if (typeof(title) == "undefined") {
                        var title = imgArr.eq(i).attr("title");
                    }
                    var width = imgArr.eq(i).attr("width");
                    var height = imgArr.eq(i).attr("height");
                    imgArr.eq(i).replaceWith("<a href='" + src + "' title='" + title + "' rel='fancy-group' class='fancy-ctn fancybox'><img src='" + src + "' width=" + width + " height=" + height + " title='" + title + "' alt='" + title + "'></a>");
                }
                $(".article-inner .fancy-ctn").fancybox();
            }
        });

    }

    //是否新窗口打开链接
    if (yiliaConfig.open_in_new == true) {
        $(".article a[href]").attr("target", "_Self")
    }
    $(".archive-article-title, .github-widget a").attr("target", "_Self");

    //随机颜色
    var colorList = ["#6da336", "#ff945c", "#66CC66", "#99CC99", "#CC6666", "#76becc", "#c99979", "#918597", "#4d4d4d"];
    var id = Math.ceil(Math.random() * (colorList.length - 1));
    //PC
    $("#container .left-col .overlay").css({"background-color": colorList[id], "opacity": .3});
    //移动端
    $("#container #mobile-nav .overlay").css({"background-color": colorList[id], "opacity": .7});

    $("table").wrap("<div class='table-area'></div>");
});
