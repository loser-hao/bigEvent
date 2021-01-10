$(function () {
  // 查询条件
  let params = {
    pagenum: 1, //	是	int	页码值
    pagesize: 2, //	是	int	每页显示多少条数据
    cate_id: "", //	否	string	文章分类的 Id
    state: "",
  };

  // 查询数据
  getList();
  function getList() {
    // console.log(params);
    $("tbody").empty();
    $.ajax({
      url: "/my/article/list",
      data: params,
      success: function (res) {
        // console.log(res);
        let list = $(template("act-list", res));
        list.appendTo("tbody");

        showPage(res.total);
      },
    });
  }

  // 筛选
  $("#chooseType").click(function (e) {
    e.preventDefault();
    params.cate_id = $("[name=type]").val();
    params.state = $("[name=status]").val();
    params.pagenum = 1;
    params.pagesize = 2;

    //    console.log(params.cate_id);
    getList();
  });

  // 渲染下拉选择
  gitOption();
  function gitOption() {
    $("#type").empty();
    $.ajax({
      url: "/my/article/cates",
      success: function (res) {
        // console.log(res);
        $(`  <option value="">所有分类</option>`).appendTo("#type");
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

  // 分页
  // showPage();
  function showPage(pageTotal) {
    // console.log(pageTotal);
    layui.laypage.render({
      elem: "page", //注意，这里的 test1 是 ID，不用加 # 号
      layout: ["count", "prev", "page", "next", "limit", "skip"],
      count: pageTotal, //数据总数，从服务端得到
      groups: 3,
      limit: params.pagesize,
      limits: [1, 2, 5, 10, 50],
      curr: params.pagenum,

      jump: function (obj, first) {
        //首次不执行
        if (!first) {
          params.pagenum = obj.curr; //得到当前页，以便向服务端请求对应页的数据。
          params.pagesize = obj.limit; //得到每页显示的条数
          console.log(obj.limit);
          // obj.limit=obj.limit
          console.log(obj);
          getList();
        }
      },
    });
  }

  // 删除
  $("tbody").on("click", "#del", function () {
    let id = $(this).attr("ownId");
    layui.layer.confirm(
      "确定要删除吗?",
      { icon: 3, title: "提示" },
      function (index) {
        console.log($("[id=del]").length);
        // return
        if ($("[id=del]").length === 1) {
          if (params.pagenum === 1) {
            params.pagenum = 1;
          } else {
            params.pagenum = params.pagenum - 1;
            // console.log(params);
          }
        }
        // console.log(params);
        // return
        $.ajax({
          url: "/my/article/delete/" + id,
          success: function (res) {
            if (res.status !== 0) {
              return layui.layer.msg("删除失败");
            }
            layui.layer.msg("删除成功");

            getList();
          },
        });
        layer.close(index);
      }
    );
  });

  // 编辑
  $("tbody").on("click", "#update", function () {
    let id = $(this).attr("ownId");

    // 跳转页面
    location.href = "/article/articleRelease.html?id=" + id;

    // console.log(id);
    // setTimeout(()=>{
    //         console.log(window.parent);
    //         console.log(window.parent.querySelector("iframe"));

    //         $("iframe").attr({"src":"/article/articleList.html"})
    //         $("iframe").attr("src","/article/articleList.html")
    //         console.log($("iframe").prop("src"));
    //         console.log(999);
    //         $.ajax({
    //             url: "/my/article/"+id,
    //             success: function (res) {
    //               console.log(res);

    //               layui.form.render();

    //               layui.form.val("filter",res.data);
    //             },
    //             error:function(res){
    //                 console.log(res);
    //             },
    //             complete:function(res){
    // console.log(res);
    //             }
    //           });
    //     },1000)
  });
});
