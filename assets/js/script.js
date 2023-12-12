$(document).ready(() => {
    const dateStr = dayjs().format('YYYY-MM-DD');
    const currentHour = dayjs().$H;
    let tasks, firstFill;
    
    firstFill = false;
    if (!(localStorage.getItem("tasks")))
        tasks = {};
    else
        tasks = JSON.parse(localStorage.getItem("tasks"));

    if (!(tasks.hasOwnProperty(dateStr))) {
        firstFill = true;
        tasks[dateStr] = {};
    }

    $("#currentDay").text(dayjs().format("MMMM Do, YYYY"));

    for (let i = 9; i <= 17; ++i) {
        const timeStr = `${i <= 12 ? i : i - 12}${i < 12 ? 'A' : 'P'}M`;
        if (firstFill)
            tasks[dateStr][timeStr] = "";
        const newBlock = $("<div></div>");
        newBlock.addClass("row justify-content-between hour time-block");
        const timeLabel = $("<label></label>");
        timeLabel.text(timeStr);
        timeLabel.addClass("col-lg-2 col-md-2 col-sm-12");
        newBlock.append(timeLabel);
        const taskArea = $("<textarea></textarea>");
        taskArea.addClass("col-lg-8 col-md-8 col-sm-12")
        const saveBtn = $("<button></button>");
        saveBtn.addClass("saveBtn col-lg-2 col-md-2 col-sm-12");
        const icon = $("<i></i>");
        icon.addClass("fas fa-pencil-alt");
        saveBtn.append(icon);
        if (!firstFill)
            taskArea.text(tasks[dateStr][timeStr]);
        if (i < currentHour) {
            taskArea.addClass("past");
            taskArea.prop("disabled", true);
            saveBtn.prop("disabled", true);
        }
        else
            taskArea.addClass(i === currentHour ? "present" : "future");
        newBlock.append(taskArea);
        saveBtn.on("click", function () {
            tasks[dateStr][timeStr] = taskArea.val();
            localStorage.setItem("tasks", JSON.stringify(tasks));
        });
        newBlock.append(saveBtn);
        $("#timeblocks").append(newBlock);
    }
})