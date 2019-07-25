function onSegment(p, q, r) {
  if (q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y)) return true;
  return false;
}

function orientation(p, q, r) {
  var val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
  //alert(val);
  if (val == 0) return 0; // colinear
  return val > 0 ? 1 : 2; // clock or counterclock wise
}

function doIntersect(p1, q1, p2, q2) {
  // Find the four orientations needed for general and
  // special cases
  var o1 = orientation(p1, q1, p2);
  var o2 = orientation(p1, q1, q2);
  var o3 = orientation(p2, q2, p1);
  var o4 = orientation(p2, q2, q1);

  // General case
  if (o1 != o2 && o3 != o4) return true;

  // Special Cases
  // p1, q1 and p2 are colinear and p2 lies on segment p1q1
  if (o1 == 0 && onSegment(p1, p2, q1)) return true;

  // p1, q1 and p2 are colinear and q2 lies on segment p1q1
  if (o2 == 0 && onSegment(p1, q2, q1)) return true;

  // p2, q2 and p1 are colinear and p1 lies on segment p2q2
  if (o3 == 0 && onSegment(p2, p1, q2)) return true;

  // p2, q2 and q1 are colinear and q1 lies on segment p2q2
  if (o4 == 0 && onSegment(p2, q1, q2)) return true;

  return false; // Doesn't fall in any of the above cases
}
function isInside(polygon, n, p) {
  // There must be at least 3 vertices in polygon[]
  if (n < 3) return false;

  // Create a point for line segment from p to infinite
  var extreme = { x: 10.026873561135087, y: 105.76936750630568 };

  // Count intersections of the above line with sides of polygon
  var count = 0,
    i = 0;
  do {
    var next = (i + 1) % n;

    // Check if the line segment from 'p' to 'extreme' intersects
    // with the line segment from 'polygon[i]' to 'polygon[next]'
    if (doIntersect(polygon[i], polygon[next], p, extreme)) {
      // If the point 'p' is colinear with line segment 'i-next',
      // then check if it lies on segment. If it lies, return true,
      // otherwise false

      // cout << (orientation(polygon[i], p, polygon[next]));
      if (orientation(polygon[i], p, polygon[next]) == 0) {
        // cout<< "Canh: ";
        // cout<< i;
        // cout<< next;
        // cout << onSegment(polygon[i], p, polygon[next]);
        return onSegment(polygon[i], p, polygon[next]);
      }

      count++;
    }
    if ((onSegment(extreme, polygon[i], p) == 0 || onSegment(extreme, polygon[next], p) == 0) && count == 2) {
      return count % 2 == 1;
    }
    i = next;
  } while (i != 0);

  // cout << "so diem ";
  // cout << count;
  // Return true if count is odd, false otherwise
  return count % 2 == 0; // Same as (count%2 == 1)
}
