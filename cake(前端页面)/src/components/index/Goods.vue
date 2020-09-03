<template>
<!-- 整个大图模块 -->
    <div class="content">
        <!-- 上图模块 -->
        <div class="up">
            <!-- 上左图模块 -->
            <div class="up_left">
                <img src="../../assets/module/SmallImg.jpg">
            </div>

            <!-- 上右图模块 -->
            <div class="up_right">
                <!-- 上右图的上图模块 -->
                <div class="up_right_top">
                    <!-- 上右图的上图模块的左边小模块 -->
                    <div class="up_right_top_left">
                        <h3>品牌介绍</h3>
                        <span></span>
                        <h4>用心烘焙，让生活更美味</h4>
                    </div>
                    <!-- 三角形 -->
                        <div class="triangle1"></div>
                    <!-- 上右图的上图模块的右边小模块 -->
                    <div class="up_right_top_right">
                        <img src="../../assets/module/course1.jpg">
                    </div>
                </div>

                <!-- 上右图的下图模块 -->
                <div class="up_right_bottom">
                    <!-- 三角形 -->
                    <div class="triangle2"></div>
                    <div class="up_right_bottom_left">
                        <img src="../../assets/module/course2.jpg">
                    </div>
                    <!-- 上右图的下图模块的右边小模块 -->
                    <div class="up_right_bottom_right">
                        <h3>品牌历程</h3>
                        <span></span>
                        <h4>创造无限，品味生活</h4>
                    </div>
                    
                </div>
            </div>
        </div>


        <!-- 下图模块 -->
        <div class="down">
            <!-- 下左图模块 -->
            <div class="down_left">
                <!-- 下左图的上图模块 -->
                <div class="down_left_top">
                    <!-- 下左图的上图模块的左边小模块 -->
                    <div class="down_left_top_left">
                        <img src="../../assets/module/course3.jpg">
                    </div>
                    <!-- 下左图的上图模块的右边小模块 -->
                    <div class="down_left_top_right">
                         <h3>品牌荣誉</h3>
                        <span></span>
                        <h4>载誉始发，极致创新</h4>
                        <!-- 三角形 -->
                        <div class="triangle3"></div>
                    </div>
                </div>

                <!-- 下左图的下图模块 -->
                <div class="down_left_bottom">
                    <!-- 下左图的下图模块的左边小模块 -->
                    <div class="down_left_bottom_left">
                        <h3>门店形象</h3>
                        <span></span>
                        <h4>传递美味，传递快乐</h4>
                    </div>
                      <!-- 三角形 -->
                        <div class="triangle4"></div>
                    <!-- 下左图的下图模块的右边小模块 -->
                    <div class="down_left_bottom_right">
                        <img src="../../assets/module/course4.jpg">
                    </div>
                </div>
            </div>

            <!-- 下右图模块 -->
            <div class="down_right">
                <img src="../../assets/module/SmallImg2.jpg">
            </div>

        </div>
    </div>
</template>

 <style>
 /* 整个大的div的样式 */
    .content{
       width: 1180px;height: 1180px;
       background-color: white;
       margin: 0 auto;
    }
   /* 大的div上下两个长方形div */
   .up,.down{
       width: 100%;height: 50%;
       display: flex;
    }
   /* 左上角和右下角图片的尺寸 */
    .up_left img,.down_right img{
        width: 100%;height: 100%;
    }
    /* 右上角和左下角div的尺寸 */
    .up_right,.down_left{
        width: 50%;height: 100%;
    }
    /* 右上角和左下角div里分的各两个小div的尺寸 */
    .up_right_top,.up_right_bottom,.down_left_top,.down_left_bottom{
        width: 100%;height: 50%;
        position: relative;
        display: flex;
    }
    /* 溢出隐藏 */
    .up_right_top_left,.down_left_top_left{
        width: 50%;height: 100%;
        overflow: hidden;
    }

    .up_right_top_right,.down_left_top_right{
        width: 50%;height: 100%;
        overflow: hidden;
    }

    /* 上右图的下图的样式  溢出隐藏 */
    .up_right_bottom_left,.down_left_bottom_left{
        width: 50%;height: 100%;
        overflow: hidden;
    }

    .up_right_bottom_right,.down_left_bottom_right{
        width: 50%;height: 100%;
        overflow: hidden;
    }

    .content h3{
        font-size: 24px;
        padding-top: 80px;
    }

    .up_right_top_right img,.up_right_bottom_left img,.down_left_top_left img,.down_left_bottom_right img{
        width: 100%;height: 100%;
    }
    /* 给所有content下的img加过渡 */
    .content img{
        transition:all 1.5s linear; 
    }

    .content img:hover{
        width: 100%;height: 100%;
        transform: scale(1.2); 
    }

    .up_left,.down_right{
        overflow: hidden; 
    }
    .content span{
        background-color: #C19E69;
        width: 62px;height: 3px;
    }
    /* 三角形的位置定位 */
    .triangle1,.triangle4{
        display: inline-block;
        border: 30px solid transparent;
        border-top:  30px solid white;
        transform: rotate(-90deg);
        position: absolute;
        left: 50%;
        top: 43%;
        z-index: 1;
    }
    .triangle2,.triangle3{
        display: inline-block;
        border: 30px solid transparent;
        border-top:  30px solid white;
        transform: rotate(90deg);
        position: absolute;
        left: 40%;
        top: 43%;
        z-index: 1;
    }
    /* 右上图鼠标悬浮 */
    .up_right_top:hover .up_right_top_left{
        background-color: #C19E69;
        color: white;
    }
    .up_right_top:hover .triangle1{
         border-top:  30px solid #C19E69;
    }

    /* 右下图的鼠标悬浮 */
    .up_right_bottom:hover .up_right_bottom_right{
        background-color: #C19E69;
        color: white;
    }
    .up_right_bottom:hover .triangle2{
        border-top:  30px solid #C19E69;
    }
    /* 左上图的鼠标悬浮 */
    .down_left_top:hover .down_left_top_right{
        background-color: #C19E69;
        color: white;
    }
    .down_left_top:hover .triangle3{
        border-top:  30px solid #C19E69;
    }
    /* 左下图的鼠标悬浮 */
    .down_left_bottom:hover .down_left_bottom_left{
        background-color: #C19E69;
        color: white;
    }
    .down_left_bottom:hover .triangle4{
        border-top:  30px solid #C19E69;
    }
 </style>