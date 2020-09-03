<template>
    <div class="load"></div>
</template>
<style scoped>
.load{
    /* width: 100%; */
		height: 5px;
		background-color: rgb(29, 123, 151);
		animation:upload 1s cubic-bezier(0.29, 0.82, 0.46, 0.99);
		animation-fill-mode: forwards;
}
@keyframes upload{
  0%{
		width:0%;
		opacity: 100%;
  }
	99%{
		opacity: 100%;
		width:100%;
	}
	100%{
		opacity: 0%;
		width:100%;
	}
}
</style>