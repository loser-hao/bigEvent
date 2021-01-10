$(function () {
  // 初始化富文本编辑器
  initEditor();

  // 渲染下拉选择
  gitOption();
  function gitOption() {
    $("#type").empty();
    $.ajax({
      url: "/my/article/cates",
      success: function (res) {
        // console.log(res);
        //  $(`  <option value="">所有分类</option>`).appendTo("#type")
        res.data.forEach((item) => {
          $(` <option value="${item.Id}">${item.name}</option>`).appendTo(
            "#type"
          );
        });

        // ' filter' html格式化 会自动产生一个空格
        layui.form.render("select", "filter");
      },
    });
  }

  //判断是否带有id
  // console.log(location.href);
  let checkId = location.href.indexOf("?id=");
  if (checkId !== -1) {
    $("#pub").text("更新");
    $("#title").text("修改文章");
    let id = location.href.slice(checkId + 4);
    // console.log(id);
    $.ajax({
      url: "/my/article/" + id,
      success: function (res) {
        // console.log(res);
        layui.form.val("filter", res.data);
      },
    });
  }
  //
  // 找到剪裁区的图片 （img#image）
  let image = $("#image");
  // 设置配置项
  let option = {
    // 纵横比(宽高比)
    aspectRatio: 1, // 正方形
    // 指定预览区域
    preview: ".img-preview", // 指定预览区的类名（选择器）
  };

  // 调用cropper方法，创建剪裁区
  image.cropper(option);

  $("#chooseBtn").click(function () {
    // console.log("9999");
    $("#fileFace").click();
    // console.log(778);

    // ---------------  创建剪裁区 ------------------
  });

  // --------------  更换剪裁区的图片 ---------------
  // 当文件域的内容改变的时候，更换图片
  $("#fileFace").change(function () {
    // console.log(111);
    // 1. 找到选择的图片（文件对象）
    // console.dir(this);
    let fileObj = this.files[0]; // 我们选择的图片的文件对象

    // 2. 根据文件对象，生成一个临时的url，用于访问被选择的图片
    let url = URL.createObjectURL(fileObj);
    // console.log(url);

    // 3. 更换剪裁区的图片的src属性
    // - 销毁原理的剪裁区
    // - 更换图片
    // - 重新创建剪裁区
    image.cropper("destroy").attr("src", url).cropper(option);

    // image
    // .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
    //   width: 400,
    //   height: 280
    // })
    // .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
    //   // 得到文件对象后，进行后续的操作
    // })
  });

  // ---------------  点击 确定 的时候，剪裁图片，转成base64格式，提交字符串到接口 ----------
  $("#sure").click(function () {
    // 剪裁得到一张图片（canvas图片）
  });
  // 发布
  $("#pub").click(function (e) {
    e.preventDefault();

    // let fd = new FormData(document.querySelector("form"));

    // fd.append("cover_img","")
    //     fd.append("state","已发布")
    //     fd.forEach(function(item,val){
    //         console.log(item,val);
    //         // console.log();
    //     })

    image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280,
      })
      .toBlob((blob) => {
        // let contentStr = $('textarea[name="content"]').getContentTxt()
        let contentStr3 = tinymce.activeEditor.getContent();
        // console.log(contentStr);
        console.log(contentStr3);
        console.log($(".content"));

        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作 ==> 这个形参bolb就是服务器要求的cover_img这个数据

        // 1. 收集表单数据（FormData格式）
        // 2. 在发送ajax请求

        // 1. 备注：箭头函数中没有自己的this指向，找外层作用域中的this
        let fd = new FormData(document.querySelector("form"));

        // 还需要追加文章的状态 append()
        fd.append("state", "已发布");

        // 追加封面cover_img
        fd.append("cover_img", blob);
        fd.append("content", contentStr3);

        fd.forEach((item, val) => {
          console.log(item, val);
        });

        // 调用pubArt函数来实现发送ajax请求（发布文章）
        pubArt(fd);

        /* fd.forEach((value) => {
          console.log(value);
        }); */
      });
  });

  // pubArt 这是发送ajax的函数，实现发布/更新文章
  function pubArt(fd) {
    // 发布状态
    if (checkId === -1) {
      $.ajax({
        url: "/my/article/add",
        type: "post",
        data: fd,
        // 发送fd这个FormData数据的时候，需要有以下两个配置
        contentType: false,
        processData: false,
        success: function (res) {
          console.log(res);

          if (res.status !== 0) {
            return layer.msg("发布失败");
          }
          layer.msg("发布成功");
          location.href = "/article/art_list.html";
        },
      });
    } else {
      // 更新
      let id = location.href.slice(checkId + 4);
      fd.append("Id", id);
      $.ajax({
        url: "/my/article/edit",
        type: "post",
        data: fd,
        // 发送fd这个FormData数据的时候，需要有以下两个配置
        contentType: false,
        processData: false,
        success: function (res) {
          console.log(res);

          if (res.status !== 0) {
            return layer.msg("更新失败");
          }

          layer.msg("更新成功");

          // 跳转页面
          location.href = "/article/art_list.html";
        },
      });
    }
  }
});

//

// })
