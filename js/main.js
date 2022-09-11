$(document).ready(function(){
    let url = window.location.href;
    $.ajax({
        url: 'https://greenscreenactors.com/api/video_details.php',
        data: {
            account_id: 0,
            clip_id: 95
        },
        success: function(response){
            let data = JSON.parse(response);
            let clip = "";
            console.log(data.response_body);
            $.each(data.response_body, function(k,v){
                let title = v.clip_title.replace(/_/gi, " ");
                clip = `
                    <div class=${url.includes("index") ? "col-md-6 col-xs-12":"col-xs-12"}>
                        <div class="card">
                            <h2 class="card-title text-capitalize">${url.includes("single") ? title : ''}</h2>
                            <video controls="controls" width="100%" name="Green Screen Actors">
                                <source src="https://gsa.sfo3.digitaloceanspaces.com/watermarked_videos/${v.clip_public_filename}.mov">
                            </video>
                            <div class="card-body">
                            ${url.includes("index") ? `<h2 class="text-capitalize"><a href="single.html">${title}</a></h2>` : ''}
                                <p class="card-text">${v.clip_description}</p>
                                <div class="category">
                                    <h4><strong>Category</strong></h4>
                                    <span class="badge badge-success text-capitalize"> ${v.clip_category}</span>
                                </div>
                                <div class="tags">
                                    
                                    <h4><strong>Tags</strong></h4>
                                    ${v.tags.map((item,i) => {
                                        return `<span class="badge badge-success text-capitalize">${item}</span>`
                                    })}
                                </div>
                                <a href="#" class="btn btn-primary">Save</a>
                            </div>
                        </div>
                    </div>`
              $("#video_clip").append(clip);
            })
        },
    })
})
