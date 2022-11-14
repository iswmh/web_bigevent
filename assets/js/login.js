$(function () {
    // 点击去注册
    $('#link-reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击去登录
    $('#link-login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 从layui中获取form对象
    let form = layui.form
    // 通过form.verify()函数自定义校验规则
    form.verify({
        //自定义了一个叫做pwd校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        // 规则间用|分隔

        //校验两次密码是否一致的规则
        repwd: function (value) {
            //通过形参拿到的是确认密码框中的内容
            //还需要拿到密码框中的内容
            //然后进行一次等于的判断
            //如果判断失败，则return - 一个提示消息即可
            let pwd = $('.reg-box [name=password]').val()
            if(pwd!==value){
                return '两次密码不一致'
            }
        }
    })

    
    // 监听注册表单提交事件
    $('#form-reg').on('submit',function(e){
        e.preventDefault()
        let data = {
        username:$('#form-reg [name=username]').val(),
        password:$('#form-reg [name=password]').val()
    }
        $.post('/api/reguser',data,function(res){
            if(res.status !== 0){
                return layer.alert(res.message);
            }
            layer.alert('注册成功,请登录')

            //模拟点击行为
            $('#link-login').click()

        })
    })

    // 监听登录表单提交事件
    $('#form-login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.alert(res.message)
                }
                layer.alert('登录成功')
                // 把身份验证存到本地
                localStorage.setItem('token',res.token)
                //跳转到主页
                location.href = '/index.html' 
            }
        }
        )
    })
})