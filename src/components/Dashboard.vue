<template>
  <div>
    <div class="dashboard-container">
    <div ref="imageNumByDateChart" class="chart upper-chart"></div>
    <div class="charts-row">
      <div ref="tagFreqChart" class="chart lower-left-chart"></div>
      <div ref="labelStatusChart" class="chart lower-right-chart"></div>
    </div>
  </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import api from "@/api";

export default {
  name: 'Dashboard',
  data() {
    return {
      imageNumByDate: null,
      tagFreq: null,
      unlabeledImagePercentage: null,
      totalImageNum: null,
      imageNumByDateChart: null,
      tagFreqChart: null,
      labelStatusChart: null,  
      token: sessionStorage.getItem('token')
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await api.info(this.token);
        this.imageNumByDate = response.data.image_num_by_date.sort((a, b) => new Date(a.date) - new Date(b.date));
        this.tagFreq = response.data.tag_freq;
        this.unlabeledImagePercentage = response.data.unlabeled_image_percentage;
        this.totalImageNum = response.data.total_image_num;

        // 新增：处理已标签和未标签图片比例的数据
        const labeled = Math.round(this.totalImageNum * (1 - this.unlabeledImagePercentage/100));
        const unlabeled = this.totalImageNum - labeled;
        this.initLabelStatusChart(labeled, unlabeled);

        this.initCharts();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    initCharts() {
      // 初始化图像数量按日期分布的图表
      this.imageNumByDateChart = echarts.init(this.$refs.imageNumByDateChart);
      this.imageNumByDateChart.setOption({
        title: { text: '近十天图像上传数量', left: 'center' },
        xAxis: { type: 'category', data: this.imageNumByDate.map(item => item.date) },
        yAxis: { type: 'value' },
        series: [{
          data: this.imageNumByDate.map(item => item.count),
          type: 'line'
        }]
      });

      // 初始化标签频率的饼图
      this.tagFreqChart = echarts.init(this.$refs.tagFreqChart);
      this.tagFreqChart.setOption({
        title: { text: '各类标签频率' , left: 'center'},
        tooltip: { trigger: 'item' },
        series: [{
          name: 'Tags',
          type: 'pie',
          radius: '50%',
          data: this.tagFreq.map(item => ({ value: item.frequency, name: item.name })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      });
    },
    initLabelStatusChart(labeled, unlabeled) {
      if (!this.$refs.labelStatusChart) return;

      // 初始化已标签和未标签图片比例的饼图
      this.labelStatusChart = echarts.init(this.$refs.labelStatusChart);
      this.labelStatusChart.setOption({
        title: { text: '已标签和未标签图片比例' , left: 'center'},
        tooltip: { trigger: 'item' },
        series: [{
          name: 'Label Status',
          type: 'pie',
          radius: '50%',
          data: [
            { value: labeled, name: '已标签' },
            { value: unlabeled, name: '未标签' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      });
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  display: grid;
  gap: 20px; /* 图表之间的间距 */
}

.upper-chart {
  grid-column: 1 / -1; /* 占据所有列 */
  height: 350px;
  margin-top: 10px;
}

.charts-row {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 分成两列 */
}

.lower-left-chart, .lower-right-chart {
  height: 350px;
}




@media (max-width: 768px) {
  .charts-row {
    grid-template-columns: 1fr; /* 在小屏幕上变为单列 */
  }

  .lower-left-chart, .lower-right-chart {
    grid-column: 1 / -1; /* 占据整行 */
  }
}
</style>