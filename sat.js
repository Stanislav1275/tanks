
function buildEdges(vertices) {
    const edges = [];
    if (vertices.length < 3) {
        console.error("Only polygons supported.");
        return edges;
    }
    for (let i = 0; i < vertices.length; i++) {
        const a = vertices[i];
        let b = vertices[0];
        if (i + 1 < vertices.length) {
            b = vertices[i + 1];
        }
        edges.push({
            x: (b.x - a.x),
            y: (b.y - a.y),
        });
    }
    return edges;
}

function intervalDistance(minA, maxA, minB, maxB) {
    if (minA < minB) {
        return (minB - maxA);
    }
    return (minA - maxB);
}
function createPolygon(vertices) {
    const polygon = {};
    polygon.isC = false;
    polygon.isR = false;
    polygon.isD = false;
    polygon.isU = false;
    polygon.isL = false;
    polygon.vertices = vertices;
    polygon.edges = buildEdges(vertices);


    polygon.projectInAxis = function(x, y) {
        let min = 10000000000;
        let max = -10000000000;
        for (let i = 0; i < polygon.vertices.length; i++) {
            let px = polygon.vertices[i].x;
            let py = polygon.vertices[i].y;
            var projection = (px * x + py * y) / (Math.sqrt(x * x + y * y));
            if (projection > max) {
                max = projection;
            }
            if (projection < min) {
                min = projection;
            }
        }
        return { min, max };
    };


    polygon.testWith = function (otherPolygon) {
        // get all edges
        const edges = [];
        for (let i = 0; i < polygon.edges.length; i++) {
            edges.push(polygon.edges[i]);
        }
        for (let i = 0; i < otherPolygon.edges.length; i++) {
            edges.push(otherPolygon.edges[i]);
        }
        // build all axis and project
        for (let i = 0; i < edges.length; i++) {
            // get axis
            const length = Math.sqrt(edges[i].y * edges[i].y + edges[i].x * edges[i].x);
            const axis = {
                x: -edges[i].y / length,
                y: edges[i].x / length,
            };
            // project polygon under axis
            const { min: minA, max: maxA } = polygon.projectInAxis(axis.x, axis.y);
            const { min: minB, max: maxB } = otherPolygon.projectInAxis(axis.x, axis.y);
            if (intervalDistance(minA, maxA, minB, maxB) > 0) {
                return false;
            }
        }
        return true;
    };

    polygon.render = function(context) {

        context.fillStyle = "black"
        context.fillRect(polygon.vertices[0].x,polygon.vertices[0].y,50,100)

    };

    polygon.offset = function(dx, dy) {
        for (let i = 0; i < polygon.vertices.length; i++) {

            polygon.vertices[i] = {
                x: polygon.vertices[i].x + dx,
                y: polygon.vertices[i].y + dy,
            };
        }
    };

    return polygon;
}