<template>
 <div class=" z-0  flex items-center justify-center  mb-8 py-7 md:py-12 px-4 sm:px-6 lg:px-8  items-center">
	<div class="max-w-md w-full   space-y-8 p-4 bg-gray-100 rounded-xl shadow-lg z-10">
		<div class="grid  gap-8 grid-cols-1">
				<div class="flex flex-col ">
						<div class="flex flex-col sm:flex-row items-center">
							<h2  class="font-semibold text-lg mr-auto">Add orders by csv file</h2>
							<div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
						</div>
                        <br>
                        <br>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>File
        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
      </label>
      <br>
      <br>
      <div class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
      <button v-on:click="submitFile()" class="transition duration-200  ease-in-out mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-600">Submit</button>
	<a href="example.csv" class="transition duration-200  ease-in-out mb-2 md:mb-0 bg-blue-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-blue-100" download>download example file</a>
      </div>

    </div>
  </div>
  </div>
				</div>
			</div>
   </div>
</template>
<script>
//import axios from 'axios'
import {uploadOrder} from '../../api/OrderApi'
export default ({
    data() {
    return {
    file: '',
  }
    },
    methods:{
    handleFileUpload() {
        this.file = this.$refs.file.files[0];
    },
    
     submitFile() {
        const user = localStorage.getItem('user-info');
        const company_id = JSON.parse(user)._id;
        if(this.file){
            const formData = new FormData();
            formData.append('file', this.file);
            formData.append('company', company_id);
            uploadOrder(formData);

        }
        
     },
        
    }
   
})
</script>

