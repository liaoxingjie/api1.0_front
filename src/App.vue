<template>
	<div id="app">
		<!-- <div v-for="item in area" :key="item.areaId"> -->
		<div>
			<el-table
				:data="area"
				style="width: 100%">
				<el-table-column
					prop="areaId"
					label="区域ID"
					width="100">
				</el-table-column>
				<el-table-column
					prop="areaName"
					label="区域名称"
					width="150">
					<template slot-scope="{row, $index}">
						<el-input 
							v-if="isOperation[$index]" 
							v-model="row.areaName" 
							:placeholder="row.areaName"
							autofocus>
						</el-input>
						<span v-else>{{row.areaName}}</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="priority"
					label="优先级"
					width="100">
					<template slot-scope="{row, $index}">
						<el-input 
							v-if="isOperation[$index]" 
							v-model="row.priority" 
							:placeholder="row.priority">
						</el-input>
						<span v-else>{{row.priority}}</span>
					</template> 
				</el-table-column>
				<el-table-column
					prop="createTime"
					label="创建时间"
					width="250">
				</el-table-column>
				<el-table-column
					prop="updateTime"
					label="更新时间"
					width="250">
				</el-table-column>
				<el-table-column
					label="操作"
					width="250">  
					<template slot-scope="{row, $index}">
						<el-button
							v-if="!isOperation[$index]"
							type="primary"
							@click="modifyClick($index)">修改</el-button>
						<el-button 
							v-else
							type="primary"
							@click="determineClick($index, row)">确定</el-button>
						<el-button 
							type="danger"
							icon="el-icon-delete" 
							@click="deleteRow($index, row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-col style="margin-top: 20px">
                <el-button style="width: 33%;" type="primary" @click="addRow()"><span>+ 添加</span></el-button>
            </el-col>
		<!-- <div>{{item.areaId}}</div> -->
		</div>
	</div>
</template>

<script>
import API from './api/index'

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  data() {
    return {
		area: [],
		isOperation: [],
		rowData: {},
    };
  },
  methods: {
		getAreaData() {
			API.get('sa/listarea').then((res) => {
				this.area = res.areaList;
			})
		},
		modifyClick(index) {
			this.$set(this.isOperation, index, true);
		},
		determineClick(index, row) {
			this.$set(this.isOperation, index, false);
			let rowData = {
				areaId: row.areaId,
				areaName: row.areaName,
				priority: row.priority
			}
			API.put('sa/modifyarea', rowData).then(() => {
				this.getAreaData(); 
			})
		},
		deleteRow(index, row) {
			API.delete(`sa/removearea?areaId=${row.areaId}`).then(() => {
				this.getAreaData(); 
			})
		},
		addRow() {
			let trueIndex = this.isOperation;
			for (let i in trueIndex) {
				if ( trueIndex[i] === true) {
					this.$message.warning('有未保存数据，请先保存');
					return;
				}
			}
			this.add();
			API.post('sa/addarea', this.rowData).then(() => {
				this.getAreaData(); 
			})
		},
		
		add() {
			let index = this.area.length;
			this.rowData = {
				areaName: " ",
				priority: " ",
			}
			this.isOperation[index] = true;
			this.area.push(this.rowData);
		}
	
    },
  created() {
	this.getAreaData(); 
  }, 
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
 