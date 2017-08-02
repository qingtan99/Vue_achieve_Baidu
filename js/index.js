/**
 * Created by Administrator on 2017/8/2.
 */

window.onload = function() {
    var vm = new Vue({
        el: "#app",
        data: {
            dataList: [],
            msg: "",
            bUrl: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
            nowIndex: -1,
            fH: true
        },
        mouted: function() {

        },
        methods: {
            // 获取数据
            getData: function (e) {
                if (e.keyCode == 38 || e.keyCode == 40) {
                    if(this.nowIndex < -1) {
                        return;
                    }

                    if(this.nowIndex != this.dataList.length && this.nowIndex != -1) {
                        this.msg = this.dataList[this.nowIndex];
                        return;
                    }
                    return;
                }

                //回车
                if(e.keyCode == 13) {
                    window.open('https://www.baidu.com/s?wd=' + this.msg);
                    this.msg = '';
                    this.fH = true;
                }

                this.$http.jsonp(vm.bUrl, {
                    params: {
                        wd: this.msg
                    },
                    jsonp: 'cb'
                }).then(function(res){
                    if(res.body.s.length > 0) {
                        this.fH = false;
                    }
                    vm.dataList = res.body.s;
                },function(res){
                    console.log(res.status);
                });
            },

            // 键盘下箭头
            downArrow: function() {
                this.nowIndex++;
                if(this.nowIndex === this.dataList.length) {
                    this.nowIndex = 0;
                    this.msg = this.dataList[this.nowIndex];
                }
            },

            // 键盘上箭头
            upArrow: function() {
                this.nowIndex--;
                if(this.nowIndex < -1) {
                    this.nowIndex = -1;
                }
                if(this.nowIndex === -1) {
                    this.nowIndex = this.dataList.length - 1;
                    this.msg = this.dataList[this.nowIndex];
                }
            },

            // 点击事件
            clickSearch: function() {
                window.open('https://www.baidu.com/s?wd=' + this.msg);
                this.msg = '';
                this.fH = true;
            },

            // 鼠标移入
            mouseHover: function (index) {
                this.nowIndex = index;
                this.msg = this.dataList[this.nowIndex];
            }
        }

    });
}
