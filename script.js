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
            InnerOffsetY: $("#InnerOffsetY")
        };
    
        let imageListLocation = "/imgList.txt";
        let imageList = [];
    
        let loadImages = function(){
    
        };
        
        let imageCount = $("#ImageCount");
        $("#LoadImages").click(loadImages);
    
        let outerFrame = $("#outerFrame");
        let rotate = $("#rotate");
    
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
    
            rotate.empty(); // TODO: avoid doing
            let count = 0;
            for (let i = 0; i < columnCount; i++ ){
                let newColumn = "<div class=\"column\">";
                for (let j = 0; j < innerFrameCount; j++ ){
                    newColumn = newColumn+"<div class=\"innerFrame\"></div>";
                    count = count+1;
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
    
            $(".column").each(function(){
                $(this).css({
                    width: inputs.InnerWidth.val() + "px",
                    margin: inputs.InnerGap.val() + "px",
                });
            });
        };
    
        processInputs();
    
        $.each(inputs, function(){
            $(this).change(processInputs);
        });
    };
    //$.when( $.ready ).then(main);
    //$(document).ready(main);
    main();
})(jQuery);