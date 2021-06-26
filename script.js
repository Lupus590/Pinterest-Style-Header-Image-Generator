/*jshint esversion: 6 */ 
(function($){    
    let main = function(){
        let inputs = {
            OuterHeight: $("#OuterHeight"),
            OuterWidth: $("#OuterWidth"),
            OuterColour: $("#OuterColour"),
            InnerHeight: $("#InnerHeight"),
            InnerWidth: $("#InnerWidth"),
            InnerColour: $("#InnerColour"),
            InnerCornerRadius: $("#InnerCornerRadius"),
            InnerRotation: $("#InnerRotation"),
            InnerGap: $("#InnerGap"),
            InnerOffsetX: $("#InnerOffsetX"),
            InnerOffsetY: $("#InnerOffsetY"),
            ImageFiles: $("#ImageFiles"),
            BrickLikeLayout: $("#BrickLikeLayout")
        };
        
        let imageCount = $("#ImageCount");
    
        let outerFrame = $("#outerFrame");
        let rotate = $("#rotate");

        let images = [];
    
        let processInputs = function(){
            outerFrame.css({
                height: inputs.OuterHeight.val() + "px",
                width: inputs.OuterWidth.val() + "px",
                "background-color": inputs.OuterColour.val()
            });        
    
            rotate.css({
                transform: "rotate(" + inputs.InnerRotation.val() + "deg) translate(" + inputs.InnerOffsetX.val() + "px," +  inputs.InnerOffsetY.val() + "px)"
            });
    
            // TODO: improve, probably with trig
            let rotateHeight = Math.sqrt(Number(inputs.OuterHeight.val())*Number(inputs.OuterHeight.val())+Number(inputs.OuterWidth.val())*Number(inputs.OuterWidth.val()));
            let rotateWidth = rotateHeight;
            
            let innerFrameCount = Math.ceil(rotateHeight/(Number(inputs.InnerHeight.val())+Number(inputs.InnerGap.val())));
            let columnCount = Math.ceil(rotateWidth/(Number(inputs.InnerWidth.val())+Number(inputs.InnerGap.val())));

            images = [];
            $.each(inputs.ImageFiles[0].files, function(){
                images[images.length] = this;
            });
    
            rotate.empty(); // TODO: avoid doing
            let count = 0;
            let img = 0;
            for (let i = 0; i < columnCount; i++ ){
                let newColumn = "<div class=\"column\">";
                for (let j = 0; j < innerFrameCount; j++ ){
                    let imgSrc = "";
                    if(images.length > 0){
                        imgSrc = URL.createObjectURL(images[img]);
                    }
                    newColumn = newColumn+"<div class=\"innerFrame\"><img src=" + imgSrc + "></div>";
                    count = count+1;
                    img = img + 1;
                    if( img >= images.length){
                        img = 0;
                    }
                }
                
                newColumn = newColumn+"</div>";
                rotate.append(newColumn);
            }
            imageCount.val(count);
        
            $(".innerFrame").each(function(){
                $(this).css({
                    height: inputs.InnerHeight.val() + "px",
                    width: inputs.InnerWidth.val() + "px",
                    "background-color": inputs.InnerColour.val(),
                    margin: inputs.InnerGap.val() + "px",
                    "border-radius": inputs.InnerCornerRadius.val() + "px"
                });
            });
    
            let brickToggler = false;
            $(".column").each(function(){
                let topMargin = "0px";
                if(inputs.BrickLikeLayout.prop("checked")){
                    if(brickToggler){
                        topMargin = (Number(inputs.InnerHeight.val())/2) + "px";
                    }
                    brickToggler = !brickToggler;
                }

                $(this).css({
                    width: inputs.InnerWidth.val() + "px",
                    margin: inputs.InnerGap.val() + "px",
                    "margin-top": topMargin
                });
            });
        };
    
        processInputs();
    
        $.each(inputs, function(){
            $(this).change(processInputs);
        });
    };
    main();
})(jQuery);