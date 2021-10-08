on("click", ".img-reset", function(event) {
    if (!$(".img-reset").hasClass("disabled")) {
        var currentResId = EFFECTS.ModelCtrl.getCurrentImageObj().resId;
        var currentIndex = 0;
        EFFECTS.ServiceCtrl.gotoStep(EFFECTS.ModelCtrl.getCurrentImageObj().resId, 0);
        var imgObj = {
            resId: currentResId,
            currentIndex: currentIndex
        };



        if (_currentLayer == _min) {
            $(".img-undo").addClass("disabled");
            $(".img-compare").addClass("disabled");
            $(".img-reset").addClass("disabled");
            if (_max > 1) {
                $(".img-redo").removeClass("disabled")
            } else {
                $(".img-redo").addClass("disabled")
            }
        } else if (_currentLayer == _max - 1) {
            $(".img-undo").removeClass("disabled");
            $(".img-compare").removeClass("disabled");
            $(".img-redo").addClass("disabled");
            $(".img-reset").removeClass("disabled")
        } else if (_currentLayer > _min && _currentLayer < _max) {
            $(".img-undo").removeClass("disabled");
            $(".img-compare").removeClass("disabled");
            $(".img-redo").removeClass("disabled");
            $(".img-reset").removeClass("disabled")
        }