$(".PhieuNhap").click(function(){
    console.log(this.value);
    const id=this.value;
    jQuery.post("/admin/QuiDinh/SLCanNhap",{ID:id},function(data,status){
        console.log(data);
        var resp=JSON.parse(data);
        if(resp.status){
            localStorage.setItem(id, resp.min);
            $('#addSuccess').modal('toggle');
        }else{
            $('#addFail').modal('toggle');
        }
    });
});

$(".PhieuBan").click(function(){
    console.log(this.value);
    sessionStorage.setItem(this.value, 15);
});