<template lang="pug">
block content
    .container
        Header(:current_selected_index = 'stateRef.current_selected_index' title = '每日待办列表' subtitle = '每日清空以便帮您生成日报、周报、月报')
          template(v-slot:content)
              AddTask(@add_task_action = 'add_task_tap_action')
              .task-list(ref = 'task_list')
                  ul
                      li(v-for = '(item,index) in dataRef.data')
                          HomeListBox(:data = 'item' :key = 'index')
                      .load-more(@click = 'load_more_tap_action') {{ dataRef.load_more_content }}
</template>

<script src = './home.js'></script>
<style lang="less" scoped>
.container{
  width:100%;
  height:100%;
  display: flex;
  justify-content:center;
  align-items:center;
  padding:20px;
  font-family: PingFangSC-Medium, sans-serif;
    .task-list{
      width:100%;
      overflow:auto;
      ul{
        list-style:none;
        width:100%;
        max-height:100%;
        li{
          width:100%;
          display: flex;
          align-items:center;
          justify-content: space-between;
          font-size: 1.25em;
          color: var(--home-font-color);
          transition: all 0.3s linear;
        }
        .load-more{
          width:calc(100% - 25px - 7.5px);
          height:40px;
          font-size: 1.25em;
          color: var(--home-font-color);
          background:#FFF8DA;
          text-align: center;
          line-height:40px;
          border-radius: 10px;
          cursor: pointer;
        }
      }
    }
}
@media screen and (max-width:768px) {
    .container{
      width:100%;
      height:100%;
      display: flex;
      justify-content:center;
      align-items:flex-start;
      padding:5px;
      font-family: PingFangSC-Medium, sans-serif;
      .task-list{
        width:100%;
        overflow:auto;
        ul{
          list-style:none;
          width:100%;
          max-height:100%;
          li{
            width:100%;
            display: flex;
            align-items:center;
            justify-content: space-between;
            font-size: 1.25em;
            color: var(--home-font-color);
            transition: all 0.3s linear;
          }
          .load-more{
            width:100%;
            height:40px;
            font-size: 1.25em;
            color: var(--home-font-color);
            background:#FFF8DA;
            text-align: center;
            line-height:40px;
            border-radius: 10px;
            cursor: pointer;
          }
        }
      }
    }
}
</style>
