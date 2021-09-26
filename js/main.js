
const gui = new dat.gui.GUI();

var controls = {
    mask_pos: -100,
    light_pos : -200,
    mask_res: 16,
    light_res: 16,
    mask_h: 200,
    light_h : 200,
};

function draw_line(context, origin, p0, p1) {

    if (p0[1] == p1[1]) {   // 平行的直线不画
        return;
    }

    // 设置线条的颜色
    context.strokeStyle = 'black';
    // 设置线条的宽度
    context.lineWidth = 1;
    // 绘制直线
    context.beginPath();
    // 起点
    context.moveTo(origin[0] + p0[0], origin[1] - p0[1]);

    if (p0[1] > p1[1]) {
        // 计算直线与 x 轴交点
        x = p0[1] / (p0[1] - p1[1]) * (p1[0] - p0[0]) + p0[0]
        context.lineTo(origin[0] + x, origin[1]);
    }
    else {
        // 计算直线与 y = light_h 的交点
        x = (controls.light_h - p0[1]) / (p1[1] - p0[1]) * (p1[0] - p0[0]) + p0[0]
        context.lineTo(origin[0] + x, origin[1] - controls.light_h);
    }

    context.closePath();
    context.stroke();
}

function draw() {
    // 拿到画板
    var canvas = document.getElementById('canvas');
    canvas.width = 800;
    canvas.height = 500;
 
    // 拿到上下文
    var context = canvas.getContext('2d');

    // 设置坐标系原点
    var origin = [500, 400];

    // 绘制坐标系
    context.strokeStyle = 'red';
    context.lineWidth = 1;
    // x 轴
    context.beginPath();
    context.moveTo(0, origin[1]);
    context.lineTo(800, origin[1]);
    context.closePath();
    context.stroke();
    // y 轴
    context.beginPath();
    context.moveTo(origin[0], origin[1]);
    context.lineTo(origin[0], 0);
    context.closePath();
    context.stroke();
    // light
    context.strokeStyle = 'green';
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(origin[0] + controls.light_pos, origin[1]);
    context.lineTo(origin[0] + controls.light_pos, origin[1] - controls.light_h);
    context.closePath();
    context.stroke();
    // mask
    context.strokeStyle = 'green';
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(origin[0] + controls.mask_pos, origin[1]);
    context.lineTo(origin[0] + controls.mask_pos, origin[1] - controls.mask_h);
    context.closePath();
    context.stroke();
    // valid volume
    context.strokeStyle = 'blue';
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(origin[0] - 50, origin[1]);
    context.lineTo(origin[0] + 50, origin[1]);
    context.lineTo(origin[0] + 50, origin[1]-50);
    context.lineTo(origin[0] - 50, origin[1]-50);
    context.closePath();
    context.stroke();

    for (var i = controls.light_h; i >= 0; i -= controls.light_h / (controls.light_res - 1) - 0.5) {
        for (var j = controls.mask_h; j >= 0; j -= controls.mask_h / (controls.mask_res - 1) - 0.5) {
            draw_line(context, origin, 
                        [parseInt(controls.light_pos), i], 
                        [parseInt(controls.mask_pos), j]);
        }
    }

    window.requestAnimationFrame(draw);
}


const initGUI = (gui) => {
    // gui.remember(controls);
    gui.add(controls, 'mask_pos', -500, -50).step(1);
    gui.add(controls, 'light_pos', -1000, -50).step(1);
    gui.add(controls, 'mask_res', 0, 200).step(1);
    gui.add(controls, 'light_res', 0, 32).step(1);
    gui.add(controls, 'mask_h', 100, 300).step(1);
    gui.add(controls, 'light_h', 100, 400).step(1);
    return gui;
}


function main() {
    initGUI(gui);
    draw();
}

main()
