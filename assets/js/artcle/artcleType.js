    // 请求数据 渲染表格
    getList();
    function getList() {
        $("tbody").empty();
        $.ajax({
            url: "/my/article/cates",
        success: function (res) {
            console.log(res);
            // template=function(res){
            //     console.log(res);
            // }
            // let tem =$(template("act-content", res));
            // tem.appendTo("tbody");
            $(template("act-content", res)).appendTo("tbody")

        }
    })
}
let layer = layui.layer
let form = layui.form;
let index = ""
//添加类别窗口弹出 
$("#addType").click(function () {
    index = layer.open({
        type: 1,
        title: "添加类别",
        area: '500px',
        content: $("#window-form-add").html()
    });
})

 
    // 添加类别
    $("body").on("submit", "#type-form-add", function (e) {
        e.preventDefault();
        console.log("kkk");
        console.log(this);
        let data = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                layer.close(index);
                getList();

            }
        })

    })


// 修改弹出窗口以及修改功能
$("body").on("click", "#updateType", function () {
    let id = $(this).attr("ownId")
    console.log(id);
    $.ajax({
        url: "/my/article/cates/" + id,
        success: function (res) {
            index = layer.open({
                type: 1,
                title: "编辑类别",
                area: '500px',
                content: $("#window-form-update").html()
            });
            // console.log(res);
            form.val("formTest", res.data);

            // 更新类别
            $("body").on("submit", "#type-form-update", function (e) {
                e.preventDefault();
                let data = $(this).serialize();
                $.ajax({
                    type: "POST",
                    url: "/my/article/updatecate",
                    data,
                    success: function (res) {
                        console.log(res);
                        if (res.status !== 0) {
                            return layer.msg(res.message)
                        }
                        layer.msg(res.message)
                        layer.close(index);
                        getList();

                    }
                })

            })
        }
    })
})

// 删除
$("body").on("click", "#delType", function () {
    let id = $(this).attr("ownId")

    layer.confirm('确定要删除吗?', {icon: 3, title:'提示'}, function(index){
        $.ajax({
            url: "/my/article/deletecate/"+id,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                layer.close(index);
                getList();

            }
        })
      });
})