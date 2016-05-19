<?php

require_once('config.php');

$month = isset($_GET['month'])
  ? (int)$_GET['month']
  : idate('m');
$year = isset($_GET['year'])
  ? (int)$_GET['year']
  : idate('Y');
$squad = isset($_GET['squad'])
  ? (int)$_GET['squad']
  : 254;
$month_beginning_timestamp = date_create("$month/1/$year");
if ($month < 1 || $month > 12) {
  header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
  exit;
}

// First, validate the squad ID
$result = $conn->query("SELECT id, name FROM squads");
$squads = array();
while ($row = $result->fetch_assoc()) {
  $squads[$row['id']] = $row['name'];
}
if (!isset($squads[$squad])) {
  header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
  exit;
}

// Fetch the actual text for each day
$result = $conn->query(
  "SELECT id, DAY(date) AS day, text FROM days ".
    "WHERE MONTH(date) = $month AND YEAR(date) = $year AND squad = $squad ".
    "ORDER BY date"
);
$text = array();
while ($row = $result->fetch_assoc()) {
  $text[$row['day']] = $row['text'];
}

?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
            <style type="text/css">
                table {
                  height: 100%;
                  width: 100%;
                  table-layout: fixed;
                }
                textarea {
                  position: absolute;
                  top: 0px;
                  left: 0px;
                  background: none;
                  width: 100%;
                  height: 100%;
                  box-sizing: border-box;
                  outline: none;
                  border: none;
                  resize: none;
                  overflow: auto;
                  overflow-y: hidden;
                  padding: 5px;
                }
                textarea:focus {
                  border: 1px dotted #C4B37E;
                  padding: 4px;
                }
                * {
                  padding: 0;
                  margin: 0;
                }
                header {
                  height: 42px;
                }
                header, tr {
                  font-family: 'Anaheim', sans-serif;
                }
                body {
                  background-color: #FFFAF0;
                }
                td.day {
                  background-color: white;
                  position: relative;
                  height: 100px;
                }
                td.day > h2 {
                  position: absolute;
                  bottom: 2px;
                  right: 3px;
                  color: #FEE5AC;
                  font-size: 32px;
                  line-height: 32px;
                  pointer-events: none;
                }
                td.currentday > h2 {
                  color: #FF944D;
                }
                h1 {
                  position: absolute;
                  padding-left: 4px;
                }
                div.upper-right {
                  position: absolute;
                  padding: 10px;
                  right: 0;
                }
                div.upper-right > select {
                  height: 28px;
                  font-size: 12px;
                  border: 1px solid #AAA;
                }
                h2.upper-center {
                  text-align: center;
                }
            </style>
        <title>SquadCal</title>
        <link href="https://fonts.googleapis.com/css?family=Anaheim" rel="stylesheet" type='text/css'>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    </head>
    <body>
        <header>
          <h1>SquadCal</h1>
<?php

$month_name = $month_beginning_timestamp->format('F');

$prev_month = $month - 1;
$year_of_prev_month = $year;
if ($prev_month === 0) {
  $prev_month = 12;
  $year_of_prev_month = $year - 1;
}
$prev_url = "{$base_url}?month={$prev_month}&amp;year={$year_of_prev_month}&amp;squad={$squad}";

$next_month = $month + 1;
$year_of_next_month = $year;
if ($next_month === 13) {
  $next_month = 1;
  $year_of_next_month = $year + 1;
}
$next_url = "{$base_url}?month={$next_month}&amp;year={$year_of_next_month}&amp;squad={$squad}";

echo <<<HTML
          <div class="upper-right">
            <select id="squad_nav">
HTML;
foreach ($squads as $id => $name) {
  $selected = $id === $squad ? " selected" : "";
  echo <<<HTML
              <option value="$id"$selected>$name</option>
HTML;
}
echo <<<HTML
            </select>
          </div>
          <h2 class="upper-center">
            <a href="{$prev_url}">&lt;</a>
            $month_name $year
            <a href="{$next_url}">&gt;</a>
          </h2>
        </header>
        <table>
          <tr>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
          </tr>
HTML;

$days_in_month = $month_beginning_timestamp->format('t');

$first_day_of_week = $month_beginning_timestamp->format('l');
$days_of_week = array(
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
);

$current_date = 1;
$day_of_week = array_shift($days_of_week);
$days_of_week[] = $day_of_week;
echo "          <tr>\n";
while ($day_of_week !== $first_day_of_week) {
  echo "            <td></td>\n";
  $day_of_week = array_shift($days_of_week);
  $days_of_week[] = $day_of_week;
}

$today_date = idate('d');
$today_month = idate('m');
$today_year = idate('Y');
for ($current_date = 1; $current_date <= $days_in_month; $current_date++) {
  if ($day_of_week === 'Sunday') {
    echo "          </tr>\n";
    echo "          <tr>\n";
  }
  $day_of_week = array_shift($days_of_week);
  $days_of_week[] = $day_of_week;
  if ($today_date === $current_date && $today_month === $month && $today_year === $year) {
    echo "            <td class='day currentday'>\n";
  } else {
    echo "            <td class='day'>\n";
  }
  echo "              <h2>$current_date</h2>\n";
  echo "              <textarea rows='3' id='$current_date'>$text[$current_date]</textarea>\n";
  echo "            </td>\n";
}

while ($day_of_week !== 'Sunday') {
  echo "            <td></td>\n";
  $day_of_week = array_shift($days_of_week);
  $days_of_week[] = $day_of_week;
}
echo "          </tr>\n";

?>
        <script>
          var session_id = Math.floor(0x80000000 * Math.random()).toString(36);

          var original_values = {};
          $('textarea').each(function(i, element) {
            original_values[element.id] = element.value;
          });

          $('textarea').on('input', function(event) {
            $.post(
              'save.php',
              {
                'text': event.target.value,
                'day': event.target.id,
                'month': <?=$month?>,
                'year': <?=$year?>,
                'squad': <?=$squad?>,
                'prev_text': original_values[event.target.id],
                'session_id': session_id,
                'timestamp': Date.now(),
              },
              function(data) {
                console.log(data);
                if (data.error === 'concurrent_modification') {
                  alert('Some one is editing at the same time as you! Please refresh and try again.');
                }
              }
            );
          });

          $('select#squad_nav').change(function(event) {
            window.location.href = "<?=$base_url?>?month=<?=$month;?>&year=<?=$year;?>&squad=" + event.target.value;
          });
        </script>
        </table>
    </body>
</html>
