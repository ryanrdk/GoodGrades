/**
 * Bundle of @devexpress/dx-react-scheduler
 * Generated: 2019-12-19
 * Version: 2.3.2
 * License: https://js.devexpress.com/Licensing
 */

import {
  createElement,
  PureComponent,
  Fragment,
  createRef,
  useRef,
  useState,
  useCallback,
  useEffect
} from 'react';
import {
  Plugin,
  Getter,
  Template,
  TemplatePlaceholder,
  PluginHost,
  TemplateConnector,
  Action,
  createStateHelper,
  DragDropProvider as DragDropProvider$1,
  DropTarget,
  DragSource
} from '@devexpress/dx-react-core';
import {
  formatDateTimeGetter,
  appointments,
  computed,
  availableViews,
  getAppointmentStyle,
  startViewDate,
  endViewDate,
  verticalTimeTableRects,
  viewCellsData,
  horizontalTimeTableRects,
  monthCellsData,
  viewBoundText,
  POSITION_START,
  POSITION_END,
  allDayCells,
  allDayRects,
  changeCurrentDate,
  setCurrentViewName,
  preCommitChanges,
  startEditAppointment,
  stopEditAppointment,
  changeAppointment,
  cancelChanges,
  RECURRENCE_EDIT_SCOPE,
  changedAppointmentById,
  addAppointment,
  cancelAddedAppointment,
  TOGGLE_APPOINTMENT_TOOLTIP_VISIBILITY,
  getAppointmentResources,
  OPEN_COMMAND_BUTTON,
  CLOSE_COMMAND_BUTTON,
  DELETE_COMMAND_BUTTON,
  setAppointmentMeta,
  TOGGLE_APPOINTMENT_FORM_VISIBILITY,
  callActionIfExists,
  isAllDayCell,
  setAppointmentData,
  autoScroll,
  cellIndex,
  cellData,
  cellType,
  calculateInsidePart,
  intervalDuration,
  calculateAppointmentTimeBoundaries,
  calculateDraftAppointments,
  RESIZE_TOP,
  RESIZE_BOTTOM,
  validateResources,
  convertResourcesToPlain,
  isMonthCell,
  getCurrentTimeIndicatorTop,
  isCellShaded,
  isShadedAppointment
} from '@devexpress/dx-scheduler-core';
import {
  memoize,
  createClickHandlers,
  getMessagesFormatter
} from '@devexpress/dx-core';
import moment from 'moment';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var extendStatics = function(d, b) {
  extendStatics =
    Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array &&
      function(d, b) {
        d.__proto__ = b;
      }) ||
    function(d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype =
    b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
}

var __assign = function() {
  __assign =
    Object.assign ||
    function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
  return __assign.apply(this, arguments);
};

function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === 'function')
    for (var i = 0, pb = Object.getOwnPropertySymbols(s); i < pb.length; i++) {
      if (
        e.indexOf(pb[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(s, pb[i])
      )
        t[pb[i]] = s[pb[i]];
    }
  return t;
}

function __read(o, n) {
  var m = typeof Symbol === 'function' && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
    r,
    ar = [],
    e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error: error };
  } finally {
    try {
      if (r && !r.done && (m = i['return'])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}

var SchedulerCoreBase = /*#__PURE__*/ (function(_super) {
  __extends(SchedulerCoreBase, _super);
  function SchedulerCoreBase() {
    var _this = _super !== null && (_super.apply(this, arguments) || this);
    _this.formatDateTimeGetter = memoize(function(locale) {
      return formatDateTimeGetter(locale);
    });
    return _this;
  }
  SchedulerCoreBase.prototype.render = function() {
    var _a = this.props,
      data = _a.data,
      Root = _a.rootComponent,
      locale = _a.locale,
      height = _a.height,
      firstDayOfWeek = _a.firstDayOfWeek;
    return createElement(
      Plugin,
      { name: 'SchedulerCore' },
      createElement(Getter, {
        name: 'appointments',
        value: appointments(data)
      }),
      createElement(Getter, {
        name: 'formatDate',
        value: formatDateTimeGetter(locale)
      }),
      createElement(Getter, { name: 'firstDayOfWeek', value: firstDayOfWeek }),
      createElement(Getter, { name: 'locale', value: locale }),
      createElement(
        Template,
        { name: 'root' },
        createElement(
          Root,
          { height: height },
          createElement(TemplatePlaceholder, { name: 'schedulerRoot' }),
          createElement(TemplatePlaceholder, { name: 'header' }),
          createElement(TemplatePlaceholder, { name: 'body' }),
          createElement(TemplatePlaceholder, { name: 'footer' })
        )
      )
    );
  };
  return SchedulerCoreBase;
})(PureComponent);
/***
 * The Scheduler is a root container component designed to process
 * and display the specified data. The Scheduler's functionality
 * (data visualization and processing) is implemented in several plugins
 * specified as child components.
 * */
var SchedulerCore = SchedulerCoreBase;

var SchedulerBase = function(_a) {
  var data = _a.data,
    rootComponent = _a.rootComponent,
    children = _a.children,
    locale = _a.locale,
    height = _a.height,
    firstDayOfWeek = _a.firstDayOfWeek;
  return createElement(
    PluginHost,
    null,
    createElement(SchedulerCore, {
      data: data,
      rootComponent: rootComponent,
      locale: locale,
      height: height,
      firstDayOfWeek: firstDayOfWeek
    }),
    children
  );
};
SchedulerBase.defaultProps = {
  data: [],
  locale: 'en-US',
  height: 'auto',
  firstDayOfWeek: 0
};
// tslint:disable: max-line-length
/***
 * The Scheduler is a root container component designed to process
 * and display the specified data. The Scheduler’s functionality
 * (data visualization and processing) is implemented in several plugins specified as child components.
 * */
var Scheduler = SchedulerBase;

var CellPlaceholder = function(params) {
  return createElement(TemplatePlaceholder, { name: 'cell', params: params });
};
var AppointmentPlaceholder = function(params) {
  return createElement(TemplatePlaceholder, {
    name: 'appointment',
    params: params
  });
};
var startViewDateBaseComputed = function(_a) {
  var viewCellsData = _a.viewCellsData;
  return startViewDate(viewCellsData);
};
var endViewDateBaseComputed = function(_a) {
  var viewCellsData = _a.viewCellsData;
  return endViewDate(viewCellsData);
};
var TimeTablePlaceholder = function() {
  return createElement(TemplatePlaceholder, { name: 'timeTable' });
};
var DayScalePlaceholder = function() {
  return createElement(TemplatePlaceholder, { name: 'dayScale' });
};
var BasicViewBase = /*#__PURE__*/ (function(_super) {
  __extends(BasicViewBase, _super);
  function BasicViewBase() {
    var _this = _super !== null && (_super.apply(this, arguments) || this);
    _this.state = {
      rects: [],
      timeTableElementsMeta: {},
      scrollingStrategy: {
        topBoundary: 0,
        bottomBoundary: 0,
        changeVerticalScroll: function() {
          return undefined;
        }
      }
    };
    _this.scrollingStrategyComputed = memoize(function(
      viewName,
      scrollingStrategy
    ) {
      return function(getters) {
        return computed(
          getters,
          viewName,
          function() {
            return scrollingStrategy;
          },
          getters.scrollingStrategy
        );
      };
    });
    _this.timeTableElementsMetaComputed = memoize(function(
      viewName,
      timeTableElementsMeta
    ) {
      return function(getters) {
        return computed(
          getters,
          viewName,
          function() {
            return timeTableElementsMeta;
          },
          getters.timeTableElementsMeta
        );
      };
    });
    _this.intervalCountComputed = memoize(function(viewName, intervalCount) {
      return function(getters) {
        return computed(
          getters,
          viewName,
          function() {
            return intervalCount;
          },
          getters.intervalCount
        );
      };
    });
    _this.excludedDaysComputed = memoize(function(viewName, excludedDays) {
      return function(getters) {
        return computed(
          getters,
          viewName,
          function() {
            return excludedDays;
          },
          getters.excludedDays
        );
      };
    });
    _this.availableViewsComputed = memoize(function(viewName, viewDisplayName) {
      return function(_a) {
        var availableViews$1 = _a.availableViews;
        return availableViews(availableViews$1, viewName, viewDisplayName);
      };
    });
    _this.currentViewComputed = memoize(function(
      viewName,
      viewDisplayName,
      type
    ) {
      return function(_a) {
        var currentView = _a.currentView;
        return currentView && currentView.name !== viewName
          ? currentView
          : { name: viewName, type: type, displayName: viewDisplayName };
      };
    });
    _this.endViewDateComputed = function(getters) {
      var viewName = _this.props.name;
      return computed(
        getters,
        viewName,
        endViewDateBaseComputed,
        getters.endViewDate
      );
    };
    _this.startViewDateComputed = function(getters) {
      var viewName = _this.props.name;
      return computed(
        getters,
        viewName,
        startViewDateBaseComputed,
        getters.startViewDate
      );
    };
    _this.viewCellsDataComputed = memoize(function(
      viewName,
      cellDuration,
      startDayHour,
      endDayHour,
      viewCellsDataBaseComputed
    ) {
      return function(getters) {
        return computed(
          getters,
          viewName,
          viewCellsDataBaseComputed(cellDuration, startDayHour, endDayHour),
          getters.viewCellsData
        );
      };
    });
    _this.updateRects = memoize(function(
      appointments,
      startViewDate,
      endViewDate,
      viewCellsData,
      cellDuration,
      excludedDays,
      timeTableRects
    ) {
      return function(cellElementsMeta) {
        var rects = timeTableRects(
          appointments,
          startViewDate,
          endViewDate,
          excludedDays,
          viewCellsData,
          cellDuration,
          cellElementsMeta
        );
        _this.setState({
          rects: rects,
          timeTableElementsMeta: cellElementsMeta
        });
      };
    });
    _this.setScrollingStrategy = function(scrollingStrategy) {
      _this.setState({ scrollingStrategy: scrollingStrategy });
    };
    return _this;
  }
  BasicViewBase.prototype.render = function() {
    var _this = this;
    var _a = this.props,
      viewName = _a.name,
      intervalCount = _a.intervalCount,
      displayName = _a.displayName,
      type = _a.type,
      excludedDays = _a.excludedDays,
      cellDuration = _a.cellDuration,
      startDayHour = _a.startDayHour,
      endDayHour = _a.endDayHour,
      viewCellsDataComputed = _a.viewCellsDataComputed,
      timeTableRects = _a.timeTableRects,
      dayScaleCellComponent = _a.dayScaleCellComponent,
      dayScaleRowComponent = _a.dayScaleRowComponent,
      DayScale = _a.dayScaleLayoutComponent,
      TimeTableCell = _a.timeTableCellComponent,
      TimeTableLayout = _a.timeTableLayoutComponent,
      timeTableRowComponent = _a.timeTableRowComponent,
      AppointmentLayer = _a.appointmentLayerComponent,
      layoutProps = _a.layoutProps,
      Layout = _a.layoutComponent;
    var _b = this.state,
      rects = _b.rects,
      timeTableElementsMeta = _b.timeTableElementsMeta,
      scrollingStrategy = _b.scrollingStrategy;
    var viewDisplayName = displayName || viewName;
    return createElement(
      Plugin,
      { name: 'basicView' },
      createElement(Getter, {
        name: 'availableViews',
        computed: this.availableViewsComputed(viewName, viewDisplayName)
      }),
      createElement(Getter, {
        name: 'currentView',
        computed: this.currentViewComputed(viewName, viewDisplayName, type)
      }),
      createElement(Getter, {
        name: 'intervalCount',
        computed: this.intervalCountComputed(viewName, intervalCount)
      }),
      createElement(Getter, {
        name: 'excludedDays',
        computed: this.excludedDaysComputed(viewName, excludedDays)
      }),
      createElement(Getter, {
        name: 'viewCellsData',
        computed: this.viewCellsDataComputed(
          viewName,
          cellDuration,
          startDayHour,
          endDayHour,
          viewCellsDataComputed
        )
      }),
      createElement(Getter, {
        name: 'startViewDate',
        computed: this.startViewDateComputed
      }),
      createElement(Getter, {
        name: 'endViewDate',
        computed: this.endViewDateComputed
      }),
      createElement(Getter, {
        name: 'timeTableElementsMeta',
        computed: this.timeTableElementsMetaComputed(
          viewName,
          timeTableElementsMeta
        )
      }),
      createElement(Getter, {
        name: 'scrollingStrategy',
        computed: this.scrollingStrategyComputed(viewName, scrollingStrategy)
      }),
      createElement(
        Template,
        { name: 'body' },
        createElement(TemplateConnector, null, function(_a) {
          var currentView = _a.currentView;
          if (currentView.name !== viewName)
            return createElement(TemplatePlaceholder, null);
          return createElement(
            Layout,
            __assign(
              {
                dayScaleComponent: DayScalePlaceholder,
                timeTableComponent: TimeTablePlaceholder,
                setScrollingStrategy: _this.setScrollingStrategy
              },
              layoutProps
            )
          );
        })
      ),
      createElement(
        Template,
        { name: 'dayScale' },
        createElement(TemplateConnector, null, function(_a) {
          var currentView = _a.currentView,
            viewCellsData = _a.viewCellsData,
            formatDate = _a.formatDate;
          if (currentView.name !== viewName)
            return createElement(TemplatePlaceholder, null);
          return createElement(DayScale, {
            cellComponent: dayScaleCellComponent,
            rowComponent: dayScaleRowComponent,
            cellsData: viewCellsData,
            formatDate: formatDate
          });
        })
      ),
      createElement(Template, { name: 'cell' }, function(params) {
        return createElement(TemplateConnector, null, function(_a) {
          var currentView = _a.currentView;
          if (currentView.name !== viewName)
            return createElement(TemplatePlaceholder, { params: params });
          return createElement(TimeTableCell, __assign({}, params));
        });
      }),
      createElement(
        Template,
        { name: 'timeTable' },
        createElement(TemplateConnector, null, function(_a) {
          var formatDate = _a.formatDate,
            currentView = _a.currentView,
            viewCellsData = _a.viewCellsData,
            appointments = _a.appointments,
            startViewDate = _a.startViewDate,
            endViewDate = _a.endViewDate,
            excludedDaysGetter = _a.excludedDays;
          if (currentView.name !== viewName)
            return createElement(TemplatePlaceholder, null);
          var setRects = _this.updateRects(
            appointments,
            startViewDate,
            endViewDate,
            viewCellsData,
            cellDuration,
            excludedDaysGetter,
            timeTableRects
          );
          return createElement(
            Fragment,
            null,
            createElement(TimeTableLayout, {
              cellsData: viewCellsData,
              rowComponent: timeTableRowComponent,
              cellComponent: CellPlaceholder,
              formatDate: formatDate,
              setCellElementsMeta: setRects
            }),
            createElement(
              AppointmentLayer,
              null,
              rects.map(function(_a, index) {
                var dataItem = _a.dataItem,
                  rectType = _a.type,
                  fromPrev = _a.fromPrev,
                  toNext = _a.toNext,
                  durationType = _a.durationType,
                  geometry = __rest(_a, [
                    'dataItem',
                    'type',
                    'fromPrev',
                    'toNext',
                    'durationType'
                  ]);
                return createElement(AppointmentPlaceholder, {
                  key: index.toString(),
                  type: rectType,
                  data: dataItem,
                  fromPrev: fromPrev,
                  toNext: toNext,
                  durationType: durationType,
                  style: getAppointmentStyle(geometry)
                });
              })
            )
          );
        })
      )
    );
  };
  return BasicViewBase;
})(PureComponent);
var BasicView = BasicViewBase;

var TYPE = 'day';
var viewCellsDataBaseComputed = function(
  cellDuration,
  startDayHour,
  endDayHour
) {
  return function(_a) {
    var currentDate = _a.currentDate,
      intervalCount = _a.intervalCount;
    return viewCellsData(
      currentDate,
      undefined,
      intervalCount,
      [],
      startDayHour,
      endDayHour,
      cellDuration,
      Date.now()
    );
  };
};
var DayScaleEmptyCellPlaceholder = function() {
  return createElement(TemplatePlaceholder, { name: 'dayScaleEmptyCell' });
};
var TimeScalePlaceholder = function() {
  return createElement(TemplatePlaceholder, { name: 'timeScale' });
};
var DayViewBase = /*#__PURE__*/ (function(_super) {
  __extends(DayViewBase, _super);
  function DayViewBase() {
    return _super !== null && (_super.apply(this, arguments) || this);
  }
  DayViewBase.prototype.render = function() {
    var _a = this.props,
      layoutComponent = _a.layoutComponent,
      DayScaleEmptyCell = _a.dayScaleEmptyCellComponent,
      TimeScale = _a.timeScaleLayoutComponent,
      TimeScaleLabel = _a.timeScaleLabelComponent,
      timeScaleTickCellComponent = _a.timeScaleTickCellComponent,
      timeScaleTicksRowComponent = _a.timeScaleTicksRowComponent,
      dayScaleLayoutComponent = _a.dayScaleLayoutComponent,
      dayScaleCellComponent = _a.dayScaleCellComponent,
      dayScaleRowComponent = _a.dayScaleRowComponent,
      timeTableLayoutComponent = _a.timeTableLayoutComponent,
      timeTableRowComponent = _a.timeTableRowComponent,
      timeTableCellComponent = _a.timeTableCellComponent,
      appointmentLayerComponent = _a.appointmentLayerComponent,
      cellDuration = _a.cellDuration,
      viewName = _a.name,
      intervalCount = _a.intervalCount,
      displayName = _a.displayName,
      startDayHour = _a.startDayHour,
      endDayHour = _a.endDayHour;
    return createElement(
      Plugin,
      { name: 'DayView' },
      createElement(BasicView, {
        viewCellsDataComputed: viewCellsDataBaseComputed,
        type: TYPE,
        cellDuration: cellDuration,
        name: viewName,
        intervalCount: intervalCount,
        displayName: displayName,
        startDayHour: startDayHour,
        endDayHour: endDayHour,
        dayScaleLayoutComponent: dayScaleLayoutComponent,
        dayScaleCellComponent: dayScaleCellComponent,
        dayScaleRowComponent: dayScaleRowComponent,
        timeTableCellComponent: timeTableCellComponent,
        timeTableLayoutComponent: timeTableLayoutComponent,
        timeTableRowComponent: timeTableRowComponent,
        appointmentLayerComponent: appointmentLayerComponent,
        timeTableRects: verticalTimeTableRects,
        layoutComponent: layoutComponent,
        layoutProps: {
          dayScaleEmptyCellComponent: DayScaleEmptyCellPlaceholder,
          timeScaleComponent: TimeScalePlaceholder
        }
      }),
      createElement(
        Template,
        { name: 'dayScaleEmptyCell' },
        createElement(TemplateConnector, null, function(_a) {
          var currentView = _a.currentView;
          if (currentView.name !== viewName)
            return createElement(TemplatePlaceholder, null);
          return createElement(DayScaleEmptyCell, null);
        })
      ),
      createElement(
        Template,
        { name: 'timeScale' },
        createElement(TemplateConnector, null, function(_a) {
          var currentView = _a.currentView,
            viewCellsData = _a.viewCellsData,
            formatDate = _a.formatDate;
          if (currentView.name !== viewName)
            return createElement(TemplatePlaceholder, null);
          return createElement(TimeScale, {
            labelComponent: TimeScaleLabel,
            tickCellComponent: timeScaleTickCellComponent,
            rowComponent: timeScaleTicksRowComponent,
            cellsData: viewCellsData,
            formatDate: formatDate
          });
        })
      )
    );
  };
  DayViewBase.defaultProps = {
    name: 'Day',
    startDayHour: 0,
    endDayHour: 24,
    cellDuration: 30,
    intervalCount: 1
  };
  DayViewBase.components = {
    layoutComponent: 'Layout',
    layoutContainer: 'LayoutContainer',
    appointmentLayerComponent: 'AppointmentLayer',
    dayScaleEmptyCellComponent: 'DayScaleEmptyCell',
    timeScaleLayoutComponent: 'TimeScaleLayout',
    timeScaleLabelComponent: 'TimeScaleLabel',
    timeScaleTickCellComponent: 'TimeScaleTickCell',
    timeScaleTicksRowComponent: 'TimeScaleTicksRow',
    dayScaleLayoutComponent: 'DayScaleLayout',
    dayScaleCellComponent: 'DayScaleCell',
    dayScaleRowComponent: 'DayScaleRow',
    timeTableContainerComponent: 'TimeTableContainer',
    timeTableLayoutComponent: 'TimeTableLayout',
    timeTableCellComponent: 'TimeTableCell',
    timeTableRowComponent: 'TimeTableRow'
  };
  return DayViewBase;
})(PureComponent);
// tslint:disable-next-line: max-line-length
/*** A plugin that renders Scheduler data for a day. This plugin arranges appointments from top to bottom.
 * If their time intervals overlap, their width is decreased and they are placed next to each other.
 * */
var DayView = DayViewBase;

var DAYS_IN_WEEK = 7;
var TYPE$1 = 'week';
var viewCellsDataBaseComputed$1 = function(
  cellDuration,
  startDayHour,
  endDayHour
) {
  return function(_a) {
    var firstDayOfWeek = _a.firstDayOfWeek,
      intervalCount = _a.intervalCount,
      excludedDays = _a.excludedDays,
      currentDate = _a.currentDate;
    return viewCellsData(
      currentDate,
      firstDayOfWeek,
      intervalCount * DAYS_IN_WEEK,
      excludedDays,
      startDayHour,
      endDayHour,
      cellDuration,
      Date.now()
    );
  };
};
var DayScaleEmptyCellPlaceholder$1 = function() {
  return createElement(TemplatePlaceholder, { name: 'dayScaleEmptyCell' });
};
var TimeScalePlaceholder$1 = function() {
  return createElement(TemplatePlaceholder, { name: 'timeScale' });
};
var WeekViewBase = /*#__PURE__*/ (function(_super) {
  __extends(WeekViewBase, _super);
  function WeekViewBase() {
    return _super !== null && (_super.apply(this, arguments) || this);
  }
  WeekViewBase.prototype.render = function() {
    var _a = this.props,
      layoutComponent = _a.layoutComponent,
      DayScaleEmptyCell = _a.dayScaleEmptyCellComponent,
      TimeScale = _a.timeScaleLayoutComponent,
      TimeScaleLabel = _a.timeScaleLabelComponent,
      timeScaleTickCellComponent = _a.timeScaleTickCellComponent,
      timeScaleTicksRowComponent = _a.timeScaleTicksRowComponent,
      dayScaleLayoutComponent = _a.dayScaleLayoutComponent,
      dayScaleCellComponent = _a.dayScaleCellComponent,
      dayScaleRowComponent = _a.dayScaleRowComponent,
      timeTableLayoutComponent = _a.timeTableLayoutComponent,
      timeTableRowComponent = _a.timeTableRowComponent,
      timeTableCellComponent = _a.timeTableCellComponent,
      cellDuration = _a.cellDuration,
      excludedDays = _a.excludedDays,
      viewName = _a.name,
      appointmentLayerComponent = _a.appointmentLayerComponent,
      intervalCount = _a.intervalCount,
      displayName = _a.displayName,
      startDayHour = _a.startDayHour,
      endDayHour = _a.endDayHour;
    return createElement(
      Plugin,
      { name: 'WeekView' },
      createElement(BasicView, {
        viewCellsDataComputed: viewCellsDataBaseComputed$1,
        type: TYPE$1,
        cellDuration: cellDuration,
        name: viewName,
        intervalCount: intervalCount,
        displayName: displayName,
        startDayHour: startDayHour,
        endDayHour: endDayHour,
        excludedDays: excludedDays,
        dayScaleLayoutComponent: dayScaleLayoutComponent,
        dayScaleCellComponent: dayScaleCellComponent,
        dayScaleRowComponent: dayScaleRowComponent,
        timeTableCellComponent: timeTableCellComponent,
        timeTableLayoutComponent: timeTableLayoutComponent,
        timeTableRowComponent: timeTableRowComponent,
        appointmentLayerComponent: appointmentLayerComponent,
        timeTableRects: verticalTimeTableRects,
        layoutComponent: layoutComponent,
        layoutProps: {
          timeScaleComponent: TimeScalePlaceholder$1,
          dayScaleEmptyCellComponent: DayScaleEmptyCellPlaceholder$1
        }
      }),
      createElement(
        Template,
        { name: 'dayScaleEmptyCell' },
        createElement(TemplateConnector, null, function(_a) {
          var currentView = _a.currentView;
          if (currentView.name !== viewName)
            return createElement(TemplatePlaceholder, null);
          return createElement(DayScaleEmptyCell, null);
        })
      ),
      createElement(
        Template,
        { name: 'timeScale' },
        createElement(TemplateConnector, null, function(_a) {
          var currentView = _a.currentView,
            viewCellsData = _a.viewCellsData,
            formatDate = _a.formatDate;
          if (currentView.name !== viewName)
            return createElement(TemplatePlaceholder, null);
          return createElement(TimeScale, {
            labelComponent: TimeScaleLabel,
            tickCellComponent: timeScaleTickCellComponent,
            rowComponent: timeScaleTicksRowComponent,
            cellsData: viewCellsData,
            formatDate: formatDate
          });
        })
      )
    );
  };
  WeekViewBase.defaultProps = {
    startDayHour: 0,
    endDayHour: 24,
    cellDuration: 30,
    intervalCount: 1,
    excludedDays: [],
    name: 'Week'
  };
  WeekViewBase.components = {
    layoutComponent: 'Layout',
    layoutContainerComponent: 'LayoutContainer',
    appointmentLayerComponent: 'AppointmentLayer',
    dayScaleEmptyCellComponent: 'DayScaleEmptyCell',
    timeScaleLayoutComponent: 'TimeScaleLayout',
    timeScaleLabelComponent: 'TimeScaleLabel',
    timeScaleTickCellComponent: 'TimeScaleTickCell',
    timeScaleTicksRowComponent: 'TimeScaleTicksRow',
    dayScaleLayoutComponent: 'DayScaleLayout',
    dayScaleCellComponent: 'DayScaleCell',
    dayScaleRowComponent: 'DayScaleRow',
    timeTableContainerComponent: 'TimeTableContainer',
    timeTableLayoutComponent: 'TimeTableLayout',
    timeTableCellComponent: 'TimeTableCell',
    timeTableRowComponent: 'TimeTableRow'
  };
  return WeekViewBase;
})(PureComponent);
// tslint:disable: max-line-length
/***
 * A plugin that renders the Scheduler's week view. This plugin arranges appointments from top to bottom.
 * If their time intervals overlap, their width is decreased and they are placed next to each other.
 * */
var WeekView = WeekViewBase;

var timeTableRects = function(
  appointments,
  startViewDate,
  endViewDate,
  excludedDays,
  viewCellsData,
  cellDuration,
  cellElementsMeta
) {
  return horizontalTimeTableRects(
    appointments,
    startViewDate,
    endViewDate,
    viewCellsData,
    cellElementsMeta
  );
};
var TYPE$2 = 'month';
var viewCellsDataBaseComputed$2 = function(
  cellDuration,
  startDayHour,
  endDayHour
) {
  return function(_a) {
    var currentDate = _a.currentDate,
      firstDayOfWeek = _a.firstDayOfWeek,
      intervalCount = _a.intervalCount;
    return monthCellsData(
      currentDate,
      firstDayOfWeek,
      intervalCount,
      Date.now()
    );
  };
};
var MonthViewBase = /*#__PURE__*/ (function(_super) {
  __extends(MonthViewBase, _super);
  function MonthViewBase() {
    return _super !== null && (_super.apply(this, arguments) || this);
  }
  MonthViewBase.prototype.render = function() {
    var _a = this.props,
      layoutComponent = _a.layoutComponent,
      dayScaleLayoutComponent = _a.dayScaleLayoutComponent,
      dayScaleCellComponent = _a.dayScaleCellComponent,
      dayScaleRowComponent = _a.dayScaleRowComponent,
      timeTableLayoutComponent = _a.timeTableLayoutComponent,
      timeTableRowComponent = _a.timeTableRowComponent,
      timeTableCellComponent = _a.timeTableCellComponent,
      appointmentLayerComponent = _a.appointmentLayerComponent,
      viewName = _a.name,
      intervalCount = _a.intervalCount,
      displayName = _a.displayName;
    return createElement(
      Plugin,
      { name: 'MonthView' },
      createElement(BasicView, {
        viewCellsDataComputed: viewCellsDataBaseComputed$2,
        type: TYPE$2,
        name: viewName,
        intervalCount: intervalCount,
        displayName: displayName,
        dayScaleLayoutComponent: dayScaleLayoutComponent,
        dayScaleCellComponent: dayScaleCellComponent,
        dayScaleRowComponent: dayScaleRowComponent,
        timeTableCellComponent: timeTableCellComponent,
        timeTableLayoutComponent: timeTableLayoutComponent,
        timeTableRowComponent: timeTableRowComponent,
        appointmentLayerComponent: appointmentLayerComponent,
        timeTableRects: timeTableRects,
        layoutComponent: layoutComponent
      })
    );
  };
  MonthViewBase.defaultProps = {
    intervalCount: 1,
    name: 'Month'
  };
  MonthViewBase.components = {
    layoutComponent: 'Layout',
    appointmentLayerComponent: 'AppointmentLayer',
    dayScaleLayoutComponent: 'DayScaleLayout',
    dayScaleCellComponent: 'DayScaleCell',
    dayScaleRowComponent: 'DayScaleRow',
    timeTableContainerComponent: 'TimeTableContainer',
    timeTableLayoutComponent: 'TimeTableLayout',
    timeTableCellComponent: 'TimeTableCell',
    timeTableRowComponent: 'TimeTableRow'
  };
  return MonthViewBase;
})(PureComponent);
// tslint:disable: max-line-length
/***
 * A plugin that renders Scheduler data for a month. This plugin arranges appointments from left to right.
 * An appointment's size depends on its duration in days.
 * However, it occupies the entire day cell if an appointment lasts only for several hours or minutes.
 * The time scale and all-day panel are not available in this view.
 * */
var MonthView = MonthViewBase;

var ToolbarBase = /*#__PURE__*/ (function(_super) {
  __extends(ToolbarBase, _super);
  function ToolbarBase() {
    return _super !== null && (_super.apply(this, arguments) || this);
  }
  ToolbarBase.prototype.render = function() {
    var _a = this.props,
      Root = _a.rootComponent,
      FlexibleSpaceComponent = _a.flexibleSpaceComponent;
    return createElement(
      Plugin,
      { name: 'Toolbar' },
      createElement(
        Template,
        { name: 'header' },
        createElement(
          Root,
          null,
          createElement(TemplatePlaceholder, { name: 'toolbarContent' })
        ),
        createElement(TemplatePlaceholder, null)
      ),
      createElement(
        Template,
        { name: 'toolbarContent' },
        createElement(FlexibleSpaceComponent, null)
      )
    );
  };
  ToolbarBase.components = {
    rootComponent: 'Root',
    flexibleSpaceComponent: 'FlexibleSpace'
  };
  return ToolbarBase;
})(PureComponent);
/** A plugin that renders the Scheduler's toolbar. */
var Toolbar = ToolbarBase;

var pluginDependencies = [{ name: 'Toolbar' }, { name: 'ViewState' }];
var navigate = function(action, currentView, intervalCount) {
  return function(direction, nextDate) {
    return action({
      direction: direction,
      nextDate: nextDate,
      amount: intervalCount,
      step: currentView.type
    });
  };
};
var DateNavigatorBase = /*#__PURE__*/ (function(_super) {
  __extends(DateNavigatorBase, _super);
  function DateNavigatorBase() {
    var _this = _super !== null && (_super.apply(this, arguments) || this);
    _this.state = {
      visible: false
    };
    _this.setRootRef = function(target) {
      _this.target = target;
    };
    _this.handleVisibilityToggle = function() {
      _this.setState(function(prevState) {
        return { visible: !prevState.visible };
      });
    };
    _this.handleHide = function() {
      _this.setState({ visible: false });
    };
    _this.navigateAction = memoize(function(
      changeCurrentDate,
      currentView,
      intervalCount,
      navigateAction
    ) {
      return navigateAction(changeCurrentDate, currentView, intervalCount);
    });
    return _this;
  }
  DateNavigatorBase.prototype.render = function() {
    var _this = this;
    var _a = this.props,
      Root = _a.rootComponent,
      Overlay = _a.overlayComponent,
      OpenButton = _a.openButtonComponent,
      NavigationButton = _a.navigationButtonComponent,
      Calendar = _a.calendarComponent,
      CalendarRow = _a.calendarRowComponent,
      CalendarCell = _a.calendarCellComponent,
      CalendarHeaderRow = _a.calendarHeaderRowComponent,
      CalendarHeaderCell = _a.calendarHeaderCellComponent,
      CalendarText = _a.calendarTextComponent,
      CalendarNavigationButton = _a.calendarNavigationButtonComponent,
      CalendarNavigator = _a.calendarNavigatorComponent;
    var visible = this.state.visible;
    return createElement(
      Plugin,
      { name: 'DateNavigator', dependencies: pluginDependencies },
      createElement(
        Template,
        { name: 'toolbarContent' },
        createElement(TemplateConnector, null, function(_a, _b) {
          var currentDate = _a.currentDate,
            startViewDate = _a.startViewDate,
            endViewDate = _a.endViewDate,
            firstDayOfWeek = _a.firstDayOfWeek,
            currentView = _a.currentView,
            intervalCount = _a.intervalCount,
            formatDate = _a.formatDate;
          var changeCurrentDate = _b.changeCurrentDate;
          var navigateAction = _this.navigateAction(
            changeCurrentDate,
            currentView,
            intervalCount,
            navigate
          );
          var calendarDateChanged = function(nextDate) {
            navigateAction(undefined, nextDate);
            _this.handleHide();
          };
          var navigatorText = viewBoundText(
            startViewDate,
            endViewDate,
            currentView.type,
            currentDate,
            intervalCount,
            formatDate
          );
          return createElement(
            Fragment,
            null,
            createElement(Root, {
              navigationButtonComponent: NavigationButton,
              openButtonComponent: OpenButton,
              navigatorText: navigatorText,
              rootRef: _this.setRootRef,
              onVisibilityToggle: _this.handleVisibilityToggle,
              onNavigate: navigateAction
            }),
            createElement(
              Overlay,
              {
                visible: visible,
                target: _this.target,
                onHide: _this.handleHide
              },
              createElement(Calendar, {
                selectedDate: currentDate,
                firstDayOfWeek: firstDayOfWeek,
                getCells: monthCellsData,
                textComponent: CalendarText,
                navigationButtonComponent: CalendarNavigationButton,
                rowComponent: CalendarRow,
                cellComponent: CalendarCell,
                headerRowComponent: CalendarHeaderRow,
                headerCellComponent: CalendarHeaderCell,
                navigatorComponent: CalendarNavigator,
                onSelectedDateChange: calendarDateChanged,
                formatDate: formatDate
              })
            )
          );
        }),
        createElement(TemplatePlaceholder, null)
      )
    );
  };
  DateNavigatorBase.components = {
    rootComponent: 'Root',
    overlayComponent: 'Overlay',
    openButtonComponent: 'OpenButton',
    navigationButtonComponent: 'NavigationButton',
    calendarComponent: 'Calendar',
    calendarRowComponent: 'CalendarRow',
    calendarCellComponent: 'CalendarCell',
    calendarHeaderRowComponent: 'CalendarHeaderRow',
    calendarHeaderCellComponent: 'CalendarHeaderCell',
    calendarTextComponent: 'CalendarText',
    calendarNavigatorComponent: 'CalendarNavigator',
    calendarNavigationButtonComponent: 'CalendarNavigationButton'
  };
  return DateNavigatorBase;
})(PureComponent);
/** A plugin that renders the Scheduler’s date navigator. */
var DateNavigator = DateNavigatorBase;

var pluginDependencies$1 = [{ name: 'Toolbar' }, { name: 'ViewState' }];
var ViewSwitcherBase = /*#__PURE__*/ (function(_super) {
  __extends(ViewSwitcherBase, _super);
  function ViewSwitcherBase() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  ViewSwitcherBase.prototype.render = function() {
    var Switcher = this.props.switcherComponent;
    return createElement(
      Plugin,
      { name: 'ViewSwitcher', dependencies: pluginDependencies$1 },
      createElement(
        Template,
        { name: 'toolbarContent' },
        createElement(TemplatePlaceholder, null),
        createElement(TemplateConnector, null, function(_a, _b) {
          var currentView = _a.currentView,
            availableViews = _a.availableViews;
          var setCurrentViewName = _b.setCurrentViewName;
          return createElement(Switcher, {
            currentView: currentView,
            availableViews: availableViews,
            onChange: setCurrentViewName
          });
        })
      )
    );
  };
  ViewSwitcherBase.components = {
    switcherComponent: 'Switcher'
  };
  return ViewSwitcherBase;
})(PureComponent);
/** A plugin that renders the Scheduler's view switcher. */
var ViewSwitcher = ViewSwitcherBase;

var pluginDependencies$2 = [
  { name: 'DayView', optional: true },
  { name: 'WeekView', optional: true },
  { name: 'MonthView', optional: true }
];
var AppointmentsBase = /*#__PURE__*/ (function(_super) {
  __extends(AppointmentsBase, _super);
  function AppointmentsBase() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  AppointmentsBase.prototype.render = function() {
    var _a = this.props,
      SplitIndicator = _a.splitIndicatorComponent,
      Appointment = _a.appointmentComponent,
      AppointmentContent = _a.appointmentContentComponent,
      Container = _a.containerComponent,
      recurringIconComponent = _a.recurringIconComponent;
    return createElement(
      Plugin,
      { name: 'Appointments', dependencies: pluginDependencies$2 },
      createElement(Template, { name: 'appointment' }, function(_a) {
        var style = _a.style,
          params = __rest(_a, ['style']);
        return createElement(TemplateConnector, null, function(_a) {
          var formatDate = _a.formatDate;
          return createElement(
            Container,
            { style: style },
            createElement(TemplatePlaceholder, {
              name: 'appointmentTop',
              params: {
                data: params.data,
                type: params.type,
                slice: params.fromPrev
              }
            }),
            createElement(TemplatePlaceholder, {
              name: 'appointmentContent',
              params: __assign(__assign({}, params), { formatDate: formatDate })
            }),
            createElement(TemplatePlaceholder, {
              name: 'appointmentBottom',
              params: {
                data: params.data,
                type: params.type,
                slice: params.toNext
              }
            })
          );
        });
      }),
      createElement(Template, { name: 'appointmentContent' }, function(_a) {
        var onClick = _a.onClick,
          onDoubleClick = _a.onDoubleClick,
          formatDate = _a.formatDate,
          data = _a.data,
          type = _a.type,
          fromPrev = _a.fromPrev,
          toNext = _a.toNext,
          durationType = _a.durationType,
          resources = _a.resources,
          restParams = __rest(_a, [
            'onClick',
            'onDoubleClick',
            'formatDate',
            'data',
            'type',
            'fromPrev',
            'toNext',
            'durationType',
            'resources'
          ]);
        return createElement(
          Appointment,
          __assign(
            { data: data, resources: resources },
            createClickHandlers(onClick, onDoubleClick),
            restParams
          ),
          fromPrev &&
            createElement(SplitIndicator, {
              position: POSITION_START,
              appointmentType: type
            }),
          createElement(AppointmentContent, {
            data: data,
            type: type,
            durationType: durationType,
            recurringIconComponent: recurringIconComponent,
            formatDate: formatDate,
            resources: resources
          }),
          toNext &&
            createElement(SplitIndicator, {
              position: POSITION_END,
              appointmentType: type
            })
        );
      })
    );
  };
  AppointmentsBase.components = {
    splitIndicatorComponent: 'SplitIndicator',
    containerComponent: 'Container',
    appointmentComponent: 'Appointment',
    appointmentContentComponent: 'AppointmentContent',
    recurringIconComponent: 'RecurringIcon'
  };
  return AppointmentsBase;
})(PureComponent);
/** A plugin that renders appointments. */
var Appointments = AppointmentsBase;

var pluginDependencies$3 = [
  { name: 'DayView', optional: true },
  { name: 'WeekView', optional: true }
];
var defaultMessages = {
  allDay: 'All Day'
};
var MONTH = 'Month';
var AppointmentPlaceholder$1 = function(params) {
  return createElement(TemplatePlaceholder, {
    name: 'appointment',
    params: params
  });
};
var AllDayPanelPlaceholder = function(params) {
  return createElement(TemplatePlaceholder, {
    name: 'allDayPanel',
    params: params
  });
};
var CellPlaceholder$1 = function(params) {
  return createElement(TemplatePlaceholder, {
    name: 'allDayPanelCell',
    params: params
  });
};
var AllDayPanelBase = /*#__PURE__*/ (function(_super) {
  __extends(AllDayPanelBase, _super);
  function AllDayPanelBase() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.state = {
      rects: [],
      elementsMeta: {}
    };
    _this.allDayCellsData = memoize(function(viewCellsData) {
      return allDayCells(viewCellsData);
    });
    _this.updateRects = memoize(function(
      appointments,
      startViewDate,
      excludedDays,
      endViewDate,
      viewCellsData
    ) {
      return function(cellElementsMeta) {
        var allDayLeftBound = moment(startViewDate)
          .hours(0)
          .minutes(0)
          .toDate();
        var allDayRightBound = moment(endViewDate)
          .hours(23)
          .minutes(59)
          .toDate();
        var rects = allDayRects(
          appointments,
          allDayLeftBound,
          allDayRightBound,
          excludedDays,
          viewCellsData,
          cellElementsMeta
        );
        _this.setState({ rects: rects, elementsMeta: cellElementsMeta });
      };
    });
    _this.getMessageFormatter = memoize(function(
      messages,
      allDayPanelDefaultMessages
    ) {
      return getMessagesFormatter(
        __assign(__assign({}, allDayPanelDefaultMessages), messages)
      );
    });
    return _this;
  }
  AllDayPanelBase.prototype.render = function() {
    var _this = this;
    var _a = this.props,
      AppointmentLayer = _a.appointmentLayerComponent,
      Layout = _a.layoutComponent,
      Cell = _a.cellComponent,
      rowComponent = _a.rowComponent,
      TitleCell = _a.titleCellComponent,
      Container = _a.containerComponent,
      messages = _a.messages;
    var _b = this.state,
      rects = _b.rects,
      elementsMeta = _b.elementsMeta;
    var getMessage = this.getMessageFormatter(messages, defaultMessages);
    return createElement(
      Plugin,
      { name: 'AllDayPanel', dependencies: pluginDependencies$3 },
      createElement(Getter, {
        name: 'allDayElementsMeta',
        value: elementsMeta
      }),
      createElement(
        Template,
        { name: 'dayScaleEmptyCell' },
        createElement(TemplateConnector, null, function(_a) {
          var currentView = _a.currentView;
          if (currentView === MONTH) return null;
          return createElement(TitleCell, { getMessage: getMessage });
        })
      ),
      createElement(
        Template,
        { name: 'dayScale' },
        createElement(TemplatePlaceholder, null),
        createElement(TemplateConnector, null, function(_a) {
          var currentView = _a.currentView;
          if (currentView === MONTH) return null;
          return createElement(
            Container,
            null,
            createElement(AllDayPanelPlaceholder, null)
          );
        })
      ),
      createElement(
        Template,
        { name: 'allDayPanel' },
        createElement(TemplatePlaceholder, null),
        createElement(TemplateConnector, null, function(_a) {
          var currentView = _a.currentView,
            appointments = _a.appointments,
            startViewDate = _a.startViewDate,
            formatDate = _a.formatDate,
            endViewDate = _a.endViewDate,
            excludedDays = _a.excludedDays,
            viewCellsData = _a.viewCellsData;
          if (currentView.name === MONTH) return null;
          var setRects = _this.updateRects(
            appointments,
            startViewDate,
            excludedDays,
            endViewDate,
            viewCellsData
          );
          return createElement(
            Fragment,
            null,
            createElement(Layout, {
              cellComponent: CellPlaceholder$1,
              rowComponent: rowComponent,
              cellsData: _this.allDayCellsData(viewCellsData),
              setCellElementsMeta: setRects,
              formatDate: formatDate
            }),
            createElement(
              AppointmentLayer,
              null,
              rects.map(function(_a, index) {
                var dataItem = _a.dataItem,
                  type = _a.type,
                  fromPrev = _a.fromPrev,
                  toNext = _a.toNext,
                  geometry = __rest(_a, [
                    'dataItem',
                    'type',
                    'fromPrev',
                    'toNext'
                  ]);
                return createElement(AppointmentPlaceholder$1, {
                  style: getAppointmentStyle(geometry),
                  type: type,
                  key: index.toString(),
                  data: dataItem,
                  fromPrev: fromPrev,
                  toNext: toNext
                });
              })
            )
          );
        })
      ),
      createElement(Template, { name: 'allDayPanelCell' }, function(params) {
        return createElement(Cell, __assign({}, params));
      })
    );
  };
  AllDayPanelBase.defaultProps = {
    messages: {}
  };
  AllDayPanelBase.components = {
    appointmentLayerComponent: 'AppointmentLayer',
    layoutComponent: 'Layout',
    layoutContainerComponent: 'LayoutContainer',
    cellComponent: 'Cell',
    rowComponent: 'Row',
    titleCellComponent: 'TitleCell',
    containerComponent: 'Container'
  };
  return AllDayPanelBase;
})(PureComponent);
/** A plugin that renders the All Day Panel. */
var AllDayPanel = AllDayPanelBase;

var ViewStateBase = /*#__PURE__*/ (function(_super) {
  __extends(ViewStateBase, _super);
  function ViewStateBase(props) {
    var _this = _super.call(this, props) || this;
    _this.getCurrentViewComputed = memoize(function(currentViewName) {
      return function() {
        return currentViewName ? { name: currentViewName } : undefined;
      };
    });
    _this.state = {
      currentDate: props.currentDate || props.defaultCurrentDate,
      currentViewName: props.currentViewName || props.defaultCurrentViewName
    };
    var stateHelper = createStateHelper(_this, {
      currentDate: function() {
        var onCurrentDateChange = _this.props.onCurrentDateChange;
        return onCurrentDateChange;
      },
      currentViewName: function() {
        var onCurrentViewNameChange = _this.props.onCurrentViewNameChange;
        return onCurrentViewNameChange;
      }
    });
    _this.changeCurrentDate = stateHelper.applyFieldReducer.bind(
      stateHelper,
      'currentDate',
      changeCurrentDate
    );
    _this.setCurrentViewName = stateHelper.applyFieldReducer.bind(
      stateHelper,
      'currentViewName',
      setCurrentViewName
    );
    return _this;
  }
  ViewStateBase.getDerivedStateFromProps = function(nextProps, prevState) {
    var _a = nextProps.currentDate,
      currentDate = _a === void 0 ? prevState.currentDate : _a,
      _b = nextProps.currentViewName,
      currentViewName = _b === void 0 ? prevState.currentViewName : _b;
    return {
      currentDate: currentDate,
      currentViewName: currentViewName
    };
  };
  ViewStateBase.prototype.render = function() {
    var _a = this.state,
      currentDate = _a.currentDate,
      stateCurrentViewName = _a.currentViewName;
    return createElement(
      Plugin,
      { name: 'ViewState' },
      createElement(Getter, { name: 'currentDate', value: currentDate }),
      createElement(Getter, {
        name: 'currentView',
        computed: this.getCurrentViewComputed(stateCurrentViewName)
      }),
      createElement(Action, {
        name: 'changeCurrentDate',
        action: this.changeCurrentDate
      }),
      createElement(Action, {
        name: 'setCurrentViewName',
        action: this.setCurrentViewName
      })
    );
  };
  ViewStateBase.defaultProps = {
    defaultCurrentDate: new Date()
  };
  return ViewStateBase;
})(PureComponent);
/** A plugin that manages the view state. It specifies the current date and the displayed view. */
var ViewState = ViewStateBase;

var EditingStateBase = /*#__PURE__*/ (function(_super) {
  __extends(EditingStateBase, _super);
  function EditingStateBase(props) {
    var _this = _super.call(this, props) || this;
    _this.state = {
      editingAppointment:
        props.editingAppointment || props.defaultEditingAppointment,
      addedAppointment: props.addedAppointment || props.defaultAddedAppointment,
      appointmentChanges:
        props.appointmentChanges || props.defaultAppointmentChanges
    };
    var stateHelper = createStateHelper(_this, {
      editingAppointment: function() {
        var onEditingAppointmentChange = _this.props.onEditingAppointmentChange;
        return onEditingAppointmentChange;
      },
      addedAppointment: function() {
        var onAddedAppointmentChange = _this.props.onAddedAppointmentChange;
        return onAddedAppointmentChange;
      },
      appointmentChanges: function() {
        var onAppointmentChangesChange = _this.props.onAppointmentChangesChange;
        return onAppointmentChangesChange;
      }
    });
    _this.startEditAppointment = stateHelper.applyFieldReducer.bind(
      stateHelper,
      'editingAppointment',
      startEditAppointment
    );
    _this.stopEditAppointment = stateHelper.applyFieldReducer.bind(
      stateHelper,
      'editingAppointment',
      stopEditAppointment
    );
    _this.changeAppointment = stateHelper.applyFieldReducer.bind(
      stateHelper,
      'appointmentChanges',
      changeAppointment
    );
    _this.cancelChangedAppointment = stateHelper.applyFieldReducer.bind(
      stateHelper,
      'appointmentChanges',
      cancelChanges
    );
    _this.commitChangedAppointment = function(type) {
      if (type === void 0) {
        type = RECURRENCE_EDIT_SCOPE.CURRENT;
      }
      var _a = _this.state,
        appointmentChanges = _a.appointmentChanges,
        editingAppointment = _a.editingAppointment;
      var _b = _this.props,
        onCommitChanges = _b.onCommitChanges,
        preCommitChanges = _b.preCommitChanges;
      if (!editingAppointment) return;
      var changes = !editingAppointment.rRule
        ? {
            changed: changedAppointmentById(
              appointmentChanges,
              editingAppointment.id
            )
          }
        : preCommitChanges(appointmentChanges, editingAppointment, type);
      onCommitChanges(changes);
      _this.cancelChangedAppointment();
      _this.stopEditAppointment();
    };
    _this.addAppointment = stateHelper.applyFieldReducer.bind(
      stateHelper,
      'addedAppointment',
      addAppointment
    );
    _this.changeAddedAppointment = stateHelper.applyFieldReducer.bind(
      stateHelper,
      'addedAppointment',
      changeAppointment
    );
    _this.cancelAddedAppointment = stateHelper.applyFieldReducer.bind(
      stateHelper,
      'addedAppointment',
      cancelAddedAppointment
    );
    _this.commitAddedAppointment = function() {
      var onCommitChanges = _this.props.onCommitChanges;
      var stateAddedAppointment = _this.state.addedAppointment;
      onCommitChanges({
        added: stateAddedAppointment
      });
    };
    _this.commitDeletedAppointment = function(_a) {
      var deletedAppointmentData = _a.deletedAppointmentData,
        _b = _a.type,
        type = _b === void 0 ? 'current' : _b;
      var _c = _this.props,
        onCommitChanges = _c.onCommitChanges,
        preCommitChanges = _c.preCommitChanges;
      var changes = deletedAppointmentData.rRule
        ? preCommitChanges(null, deletedAppointmentData, type)
        : { deleted: deletedAppointmentData.id };
      onCommitChanges(changes);
    };
    return _this;
  }
  EditingStateBase.getDerivedStateFromProps = function(nextProps, prevState) {
    var _a = nextProps.editingAppointment,
      editingAppointment = _a === void 0 ? prevState.editingAppointment : _a,
      _b = nextProps.appointmentChanges,
      appointmentChanges = _b === void 0 ? prevState.appointmentChanges : _b,
      _c = nextProps.addedAppointment,
      addedAppointment = _c === void 0 ? prevState.addedAppointment : _c;
    return {
      editingAppointment: editingAppointment,
      appointmentChanges: appointmentChanges,
      addedAppointment: addedAppointment
    };
  };
  EditingStateBase.prototype.render = function() {
    var _a = this.state,
      addedAppointment = _a.addedAppointment,
      editingAppointment = _a.editingAppointment,
      appointmentChanges = _a.appointmentChanges;
    return createElement(
      Plugin,
      { name: 'EditingState' },
      createElement(Getter, {
        name: 'editingAppointment',
        value: editingAppointment
      }),
      createElement(Action, {
        name: 'startEditAppointment',
        action: this.startEditAppointment
      }),
      createElement(Action, {
        name: 'stopEditAppointment',
        action: this.stopEditAppointment
      }),
      createElement(Getter, {
        name: 'appointmentChanges',
        value: appointmentChanges
      }),
      createElement(Action, {
        name: 'changeAppointment',
        action: this.changeAppointment
      }),
      createElement(Action, {
        name: 'cancelChangedAppointment',
        action: this.cancelChangedAppointment
      }),
      createElement(Action, {
        name: 'commitChangedAppointment',
        action: this.commitChangedAppointment
      }),
      createElement(Getter, {
        name: 'addedAppointment',
        value: addedAppointment
      }),
      createElement(Action, {
        name: 'addAppointment',
        action: this.addAppointment
      }),
      createElement(Action, {
        name: 'changeAddedAppointment',
        action: this.changeAddedAppointment
      }),
      createElement(Action, {
        name: 'cancelAddedAppointment',
        action: this.cancelAddedAppointment
      }),
      createElement(Action, {
        name: 'commitAddedAppointment',
        action: this.commitAddedAppointment
      }),
      createElement(Action, {
        name: 'commitDeletedAppointment',
        action: this.commitDeletedAppointment
      })
    );
  };
  EditingStateBase.defaultProps = {
    defaultEditingAppointment: undefined,
    defaultAppointmentChanges: {},
    defaultAddedAppointment: {},
    preCommitChanges: preCommitChanges
  };
  return EditingStateBase;
})(PureComponent);
/** A plugin that manages the scheduler appointment editing state. */
var EditingState = EditingStateBase;

var pluginDependencies$4 = [
  { name: 'Appointments' },
  { name: 'EditingState', optional: true },
  { name: 'EditRecurrenceMenu', optional: true },
  { name: 'IntegratedEditing', optional: true }
];
var commandButtonIds = {
  open: OPEN_COMMAND_BUTTON,
  close: CLOSE_COMMAND_BUTTON,
  delete: DELETE_COMMAND_BUTTON
};
var AppointmentTooltipBase = /*#__PURE__*/ (function(_super) {
  __extends(AppointmentTooltipBase, _super);
  function AppointmentTooltipBase(props) {
    var _this = _super.call(this, props) || this;
    _this.state = {
      visible: props.visible,
      appointmentMeta: props.appointmentMeta
    };
    var stateHelper = createStateHelper(_this, {
      visible: function() {
        var onVisibilityChange = _this.props.onVisibilityChange;
        return onVisibilityChange;
      },
      appointmentMeta: function() {
        var onAppointmentMetaChange = _this.props.onAppointmentMetaChange;
        return onAppointmentMetaChange;
      }
    });
    var toggleVisibility = function() {
      var isOpen = _this.state.visible;
      return !isOpen;
    };
    _this.toggleVisibility = stateHelper.applyFieldReducer.bind(
      stateHelper,
      'visible',
      toggleVisibility
    );
    _this.setAppointmentMeta = stateHelper.applyFieldReducer.bind(
      stateHelper,
      'appointmentMeta',
      setAppointmentMeta
    );
    _this.onAppointmentClick = function(_a) {
      var target = _a.target,
        data = _a.data;
      _this.setAppointmentMeta({ target: target, data: data });
      _this.toggleVisibility();
    };
    return _this;
  }
  AppointmentTooltipBase.getDerivedStateFromProps = function(
    nextProps,
    prevState
  ) {
    var _a = nextProps.visible,
      visible = _a === void 0 ? prevState.visible : _a,
      _b = nextProps.appointmentMeta,
      appointmentMeta = _b === void 0 ? prevState.appointmentMeta : _b;
    return {
      appointmentMeta: appointmentMeta,
      visible: visible
    };
  };
  AppointmentTooltipBase.prototype.render = function() {
    var _this = this;
    var _a = this.props,
      showOpenButton = _a.showOpenButton,
      showDeleteButton = _a.showDeleteButton,
      showCloseButton = _a.showCloseButton,
      Layout = _a.layoutComponent,
      headerComponent = _a.headerComponent,
      contentComponent = _a.contentComponent,
      commandButtonComponent = _a.commandButtonComponent,
      recurringIconComponent = _a.recurringIconComponent;
    var _b = this.state,
      visible = _b.visible,
      appointmentMeta = _b.appointmentMeta;
    return createElement(
      Plugin,
      { name: 'AppointmentTooltip', dependencies: pluginDependencies$4 },
      createElement(Action, {
        name: TOGGLE_APPOINTMENT_TOOLTIP_VISIBILITY,
        action: this.toggleVisibility
      }),
      createElement(
        Template,
        { name: 'timeTable' },
        createElement(TemplatePlaceholder, null),
        createElement(TemplateConnector, null, function(_a, _b) {
          var formatDate = _a.formatDate,
            resources = _a.resources,
            plainResources = _a.plainResources;
          var finishDeleteAppointment = _b.finishDeleteAppointment,
            openDeleteConfirmationDialog = _b.openDeleteConfirmationDialog;
          var onDeleteButtonClick = function() {
            if (openDeleteConfirmationDialog) {
              openDeleteConfirmationDialog({
                hideActionName: TOGGLE_APPOINTMENT_TOOLTIP_VISIBILITY,
                appointmentData: appointmentMeta.data
              });
            } else {
              _this.toggleVisibility();
              finishDeleteAppointment(appointmentMeta.data);
            }
          };
          return createElement(TemplatePlaceholder, {
            name: 'tooltip',
            params: __assign(
              __assign(
                {
                  commandButtonComponent: commandButtonComponent,
                  recurringIconComponent: recurringIconComponent,
                  showOpenButton: showOpenButton,
                  showDeleteButton: showDeleteButton,
                  showCloseButton: showCloseButton,
                  headerComponent: headerComponent,
                  contentComponent: contentComponent,
                  appointmentMeta: appointmentMeta,
                  appointmentResources: appointmentMeta
                    ? getAppointmentResources(
                        appointmentMeta.data,
                        resources,
                        plainResources
                      )
                    : [],
                  visible: visible,
                  onHide: _this.toggleVisibility,
                  commandButtonIds: commandButtonIds
                },
                finishDeleteAppointment && {
                  onDeleteButtonClick: onDeleteButtonClick
                }
              ),
              { formatDate: formatDate }
            )
          });
        })
      ),
      createElement(Template, { name: 'tooltip' }, function(params) {
        return createElement(Layout, __assign({}, params));
      }),
      createElement(Template, { name: 'appointment' }, function(params) {
        return createElement(TemplatePlaceholder, {
          params: __assign(__assign({}, params), {
            onClick: function(_a) {
              var target = _a.target,
                data = _a.data;
              return _this.onAppointmentClick({ target: target, data: data });
            }
          })
        });
      })
    );
  };
  AppointmentTooltipBase.defaultProps = {
    showOpenButton: false,
    showDeleteButton: false,
    showCloseButton: false
  };
  AppointmentTooltipBase.components = {
    layoutComponent: 'Layout',
    headerComponent: 'Header',
    contentComponent: 'Content',
    commandButtonComponent: 'CommandButton',
    recurringIconComponent: 'RecurringIcon'
  };
  return AppointmentTooltipBase;
})(PureComponent);
// tslint:disable: max-line-length
/** The AppointmentTooltip plugin allows you to display information about an appointment in a tooltip. */
var AppointmentTooltip = AppointmentTooltipBase;

var addDoubleClickToCell = function(
  title,
  startDate,
  endDate,
  allDay,
  openFormHandler,
  addAppointment,
  params
) {
  var newAppointmentData = {
    title: title,
    startDate: startDate,
    endDate: endDate,
    allDay: allDay
  };
  return createElement(TemplatePlaceholder, {
    params: __assign(__assign({}, params), {
      onClick: function() {
        openFormHandler(newAppointmentData);
        callActionIfExists(addAppointment, {
          appointmentData: newAppointmentData
        });
      }
    })
  });
};
var defaultMessages$1 = {
  allDayLabel: 'All Day',
  titleLabel: 'Title',
  commitCommand: 'Save',
  cancelCommand: 'Cancel',
  detailsLabel: 'Details',
  moreInformationLabel: 'More Information',
  repeatLabel: 'Repeat',
  notesLabel: 'Notes',
  never: 'Never',
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
  yearly: 'Yearly',
  repeatEveryLabel: 'Repeat every',
  daysLabel: 'day(s)',
  endRepeatLabel: 'End repeat',
  onLabel: 'On',
  afterLabel: 'After',
  occurrencesLabel: 'occurrence(s)',
  weeksOnLabel: 'week(s) on:',
  monthsLabel: 'month(s)',
  ofEveryMonthLabel: 'of every month',
  theLabel: 'The',
  firstLabel: 'First',
  secondLabel: 'Second',
  thirdLabel: 'Third',
  fourthLabel: 'Fourth',
  lastLabel: 'Last',
  yearsLabel: 'year(s)',
  ofLabel: 'of ',
  everyLabel: 'Every'
};
var CommandLayoutPlaceholder = function() {
  return createElement(TemplatePlaceholder, { name: 'commandLayout' });
};
var BasicLayoutPlaceholder = function() {
  return createElement(TemplatePlaceholder, { name: 'basicLayout' });
};
var RecurrenceLayoutPlaceholder = function() {
  return createElement(TemplatePlaceholder, { name: 'recurrenceLayout' });
};
var pluginDependencies$5 = [
  { name: 'EditingState', optional: true },
  { name: 'Appointments', optional: true },
  { name: 'AppointmentTooltip', optional: true },
  { name: 'EditRecurrenceMenu', optional: true },
  { name: 'IntegratedEditing', optional: true }
];
var prepareChanges = function(
  appointmentData,
  editingAppointment,
  addedAppointment,
  appointmentChanges,
  resources,
  plainResources
) {
  var isNew = !editingAppointment;
  var changedAppointment = __assign(
    __assign(__assign({}, appointmentData), appointmentChanges),
    isNew && addedAppointment
  );
  var appointmentResources = getAppointmentResources(
    changedAppointment,
    resources,
    plainResources
  );
  var isFormEdited =
    isNew || Object.getOwnPropertyNames(appointmentChanges).length !== 0;
  return {
    changedAppointment: changedAppointment,
    appointmentResources: appointmentResources,
    isNew: isNew,
    isFormEdited: isFormEdited
  };
};
var isFormFullSize = function(
  isFormVisisble,
  changedAppointmentRRule,
  previousAppointmentRRule
) {
  return (
    !!changedAppointmentRRule || (!isFormVisisble && !!previousAppointmentRRule)
  );
};
var AppointmentFormBase = /*#__PURE__*/ (function(_super) {
  __extends(AppointmentFormBase, _super);
  function AppointmentFormBase(props) {
    var _this = _super.call(this, props) || this;
    _this.container = createRef();
    _this.commitChanges = memoize(function(
      finishCommitAppointment,
      commitAddedAppointment,
      isNew,
      changedAppointment
    ) {
      return function() {
        _this.toggleVisibility();
        if (isNew) {
          callActionIfExists(commitAddedAppointment, changedAppointment);
        } else if (finishCommitAppointment) {
          finishCommitAppointment();
        }
        _this.setState({ previousAppointment: changedAppointment });
      };
    });
    _this.cancelChanges = memoize(function(
      openCancelConfirmationDialog,
      isNew,
      stopEditAppointment,
      appointmentChanges,
      changedAppointment,
      cancelAddedAppointment,
      cancelChangedAppointment
    ) {
      return function() {
        if (
          openCancelConfirmationDialog &&
          Object.keys(appointmentChanges).length !== 0
        ) {
          openCancelConfirmationDialog(TOGGLE_APPOINTMENT_FORM_VISIBILITY);
        } else {
          if (isNew) {
            callActionIfExists(cancelAddedAppointment, appointmentChanges);
          } else {
            callActionIfExists(stopEditAppointment, appointmentChanges);
            callActionIfExists(cancelChangedAppointment, appointmentChanges);
          }
          _this.toggleVisibility();
        }
        _this.setState({ previousAppointment: changedAppointment });
      };
    });
    _this.deleteAppointment = memoize(function(
      finishDeleteAppointment,
      appointmentData,
      openDeleteConfirmationDialog,
      changedAppointment,
      cancelAddedAppointment,
      cancelChangedAppointment,
      stopEditAppointment,
      isNew
    ) {
      return function() {
        if (openDeleteConfirmationDialog) {
          openDeleteConfirmationDialog({
            hideActionName: TOGGLE_APPOINTMENT_FORM_VISIBILITY,
            appointmentData: changedAppointment
          });
        } else {
          callActionIfExists(finishDeleteAppointment, appointmentData);
          if (isNew) {
            callActionIfExists(cancelAddedAppointment, appointmentData);
          } else {
            callActionIfExists(cancelChangedAppointment, appointmentData);
            callActionIfExists(stopEditAppointment, appointmentData);
          }
          _this.toggleVisibility();
        }
        _this.setState({ previousAppointment: changedAppointment });
      };
    });
    _this.changeAppointmentField = memoize(function(
      isNew,
      changeAddedAppointment,
      changeAppointment
    ) {
      return function(change) {
        if (change && change.rRule) {
          _this.setState({
            previousAppointment: __assign(
              __assign({}, _this.state.previousAppointment),
              { rRule: change.rRule }
            )
          });
        }
        if (isNew) {
          callActionIfExists(changeAddedAppointment, { change: change });
        } else {
          callActionIfExists(changeAppointment, { change: change });
        }
      };
    });
    _this.getMessage = memoize(function(menuMessages, messages) {
      return getMessagesFormatter(
        __assign(__assign({}, menuMessages), messages)
      );
    });
    _this.state = {
      visible: props.visible,
      appointmentData: props.appointmentData || {},
      previousAppointment: props.appointmentData || {}
    };
    var stateHelper = createStateHelper(_this, {
      visible: function() {
        var onVisibilityChange = _this.props.onVisibilityChange;
        return onVisibilityChange;
      },
      appointmentData: function() {
        var onAppointmentDataChange = _this.props.onAppointmentDataChange;
        return onAppointmentDataChange;
      }
    });
    var toggleVisibility = function() {
      var isOpen = _this.state.visible;
      return !isOpen;
    };
    _this.toggleVisibility = stateHelper.applyFieldReducer.bind(
      stateHelper,
      'visible',
      toggleVisibility
    );
    _this.setAppointmentData = stateHelper.applyFieldReducer.bind(
      stateHelper,
      'appointmentData',
      setAppointmentData
    );
    _this.openFormHandler = function(appointmentData) {
      _this.setAppointmentData({ appointmentData: appointmentData });
      _this.toggleVisibility();
    };
    return _this;
  }
  AppointmentFormBase.getDerivedStateFromProps = function(
    nextProps,
    prevState
  ) {
    var _a = nextProps.visible,
      visible = _a === void 0 ? prevState.visible : _a,
      _b = nextProps.appointmentData,
      appointmentData = _b === void 0 ? prevState.appointmentData : _b;
    return {
      appointmentData: appointmentData,
      visible: visible
    };
  };
  AppointmentFormBase.prototype.render = function() {
    var _this = this;
    var _a = this.props,
      Container = _a.containerComponent,
      Overlay = _a.overlayComponent,
      Layout = _a.layoutComponent,
      CommandLayout = _a.commandLayoutComponent,
      BasicLayout = _a.basicLayoutComponent,
      RecurrenceLayout = _a.recurrenceLayoutComponent,
      commandButtonComponent = _a.commandButtonComponent,
      textEditorComponent = _a.textEditorComponent,
      labelComponent = _a.labelComponent,
      dateEditorComponent = _a.dateEditorComponent,
      booleanEditorComponent = _a.booleanEditorComponent,
      selectComponent = _a.selectComponent,
      radioGroupComponent = _a.radioGroupComponent,
      weeklyRecurrenceSelectorComponent = _a.weeklyRecurrenceSelectorComponent,
      resourceEditorComponent = _a.resourceEditorComponent,
      readOnly = _a.readOnly,
      messages = _a.messages;
    var _b = this.state,
      visible = _b.visible,
      appointmentData = _b.appointmentData,
      previousAppointment = _b.previousAppointment;
    var getMessage = this.getMessage(defaultMessages$1, messages);
    return createElement(
      Plugin,
      { name: 'AppointmentForm', dependencies: pluginDependencies$5 },
      createElement(Action, {
        name: TOGGLE_APPOINTMENT_FORM_VISIBILITY,
        action: this.toggleVisibility
      }),
      createElement(
        Template,
        { name: 'schedulerRoot' },
        createElement(TemplateConnector, null, function(_a, _b) {
          var editingAppointment = _a.editingAppointment,
            addedAppointment = _a.addedAppointment,
            appointmentChanges = _a.appointmentChanges,
            resources = _a.resources,
            plainResources = _a.plainResources;
          var openCancelConfirmationDialog = _b.openCancelConfirmationDialog,
            stopEditAppointment = _b.stopEditAppointment,
            cancelAddedAppointment = _b.cancelAddedAppointment,
            cancelChangedAppointment = _b.cancelChangedAppointment;
          var _c = prepareChanges(
              appointmentData,
              editingAppointment,
              addedAppointment,
              appointmentChanges,
              resources,
              plainResources
            ),
            changedAppointment = _c.changedAppointment,
            isNew = _c.isNew;
          var fullSize = isFormFullSize(
            visible,
            changedAppointment.rRule,
            previousAppointment.rRule
          );
          var onHideAction = function() {
            return (
              visible &&
              _this.cancelChanges(
                openCancelConfirmationDialog,
                isNew,
                stopEditAppointment,
                __assign(__assign({}, appointmentChanges), addedAppointment),
                changedAppointment,
                cancelAddedAppointment,
                cancelChangedAppointment
              )()
            );
          };
          return createElement(
            Fragment,
            null,
            createElement(Container, { ref: _this.container }),
            createElement(
              Overlay,
              {
                visible: visible,
                onHide: onHideAction,
                fullSize: fullSize,
                target: _this.container
              },
              createElement(Layout, {
                basicLayoutComponent: BasicLayoutPlaceholder,
                commandLayoutComponent: CommandLayoutPlaceholder,
                recurrenceLayoutComponent: RecurrenceLayoutPlaceholder,
                isRecurrence: fullSize
              })
            ),
            createElement(TemplatePlaceholder, null)
          );
        })
      ),
      createElement(
        Template,
        { name: 'commandLayout' },
        createElement(TemplateConnector, null, function(_a, _b) {
          var editingAppointment = _a.editingAppointment,
            addedAppointment = _a.addedAppointment,
            appointmentChanges = _a.appointmentChanges,
            resources = _a.resources,
            plainResources = _a.plainResources;
          var commitAddedAppointment = _b.commitAddedAppointment,
            finishCommitAppointment = _b.finishCommitAppointment,
            finishDeleteAppointment = _b.finishDeleteAppointment,
            stopEditAppointment = _b.stopEditAppointment,
            cancelAddedAppointment = _b.cancelAddedAppointment,
            cancelChangedAppointment = _b.cancelChangedAppointment,
            openCancelConfirmationDialog = _b.openCancelConfirmationDialog,
            openDeleteConfirmationDialog = _b.openDeleteConfirmationDialog;
          var _c = prepareChanges(
              appointmentData,
              editingAppointment,
              addedAppointment,
              appointmentChanges,
              resources,
              plainResources
            ),
            isNew = _c.isNew,
            changedAppointment = _c.changedAppointment,
            isFormEdited = _c.isFormEdited;
          var isRecurrence = isFormFullSize(
            visible,
            changedAppointment.rRule,
            previousAppointment.rRule
          );
          return createElement(CommandLayout, {
            commandButtonComponent: commandButtonComponent,
            onCommitButtonClick: _this.commitChanges(
              finishCommitAppointment,
              commitAddedAppointment,
              isNew,
              changedAppointment
            ),
            onCancelButtonClick: _this.cancelChanges(
              openCancelConfirmationDialog,
              isNew,
              stopEditAppointment,
              __assign(__assign({}, appointmentChanges), addedAppointment),
              changedAppointment,
              cancelAddedAppointment,
              cancelChangedAppointment
            ),
            onDeleteButtonClick: _this.deleteAppointment(
              finishDeleteAppointment,
              appointmentData,
              openDeleteConfirmationDialog,
              changedAppointment,
              cancelAddedAppointment,
              cancelChangedAppointment,
              stopEditAppointment,
              isNew
            ),
            getMessage: getMessage,
            readOnly: readOnly,
            fullSize: isRecurrence,
            disableSaveButton: !isFormEdited,
            hideDeleteButton: isNew
          });
        })
      ),
      createElement(
        Template,
        { name: 'basicLayout' },
        createElement(TemplateConnector, null, function(_a, _b) {
          var editingAppointment = _a.editingAppointment,
            addedAppointment = _a.addedAppointment,
            appointmentChanges = _a.appointmentChanges,
            locale = _a.locale,
            resources = _a.resources,
            plainResources = _a.plainResources;
          var changeAppointment = _b.changeAppointment,
            changeAddedAppointment = _b.changeAddedAppointment;
          var _c = prepareChanges(
              appointmentData,
              editingAppointment,
              addedAppointment,
              appointmentChanges,
              resources,
              plainResources
            ),
            isNew = _c.isNew,
            changedAppointment = _c.changedAppointment,
            appointmentResources = _c.appointmentResources;
          return createElement(BasicLayout, {
            locale: locale,
            appointmentData: visible ? changedAppointment : previousAppointment,
            onFieldChange: _this.changeAppointmentField(
              isNew,
              changeAddedAppointment,
              changeAppointment
            ),
            getMessage: getMessage,
            readOnly: readOnly,
            textEditorComponent: textEditorComponent,
            dateEditorComponent: dateEditorComponent,
            booleanEditorComponent: booleanEditorComponent,
            selectComponent: selectComponent,
            labelComponent: labelComponent,
            resourceEditorComponent: resourceEditorComponent,
            fullSize: !changedAppointment.rRule,
            resources: resources,
            appointmentResources: appointmentResources
          });
        })
      ),
      createElement(
        Template,
        { name: 'recurrenceLayout' },
        createElement(TemplateConnector, null, function(_a, _b) {
          var editingAppointment = _a.editingAppointment,
            addedAppointment = _a.addedAppointment,
            appointmentChanges = _a.appointmentChanges,
            formatDate = _a.formatDate,
            locale = _a.locale,
            firstDayOfWeek = _a.firstDayOfWeek;
          var changeAddedAppointment = _b.changeAddedAppointment,
            changeAppointment = _b.changeAppointment;
          var _c = prepareChanges(
              appointmentData,
              editingAppointment,
              addedAppointment,
              appointmentChanges,
              undefined,
              undefined
            ),
            isNew = _c.isNew,
            changedAppointment = _c.changedAppointment;
          var isRecurrenceLayoutVisible = isFormFullSize(
            visible,
            changedAppointment.rRule,
            previousAppointment.rRule
          );
          var correctedAppointment = !changedAppointment.rRule
            ? __assign(__assign({}, changedAppointment), {
                rRule: previousAppointment.rRule
              })
            : changedAppointment;
          return createElement(RecurrenceLayout, {
            locale: locale,
            appointmentData: visible
              ? correctedAppointment
              : previousAppointment,
            onFieldChange: _this.changeAppointmentField(
              isNew,
              changeAddedAppointment,
              changeAppointment
            ),
            getMessage: getMessage,
            readOnly: readOnly,
            formatDate: formatDate,
            textEditorComponent: textEditorComponent,
            dateEditorComponent: dateEditorComponent,
            radioGroupComponent: radioGroupComponent,
            weeklyRecurrenceSelectorComponent: weeklyRecurrenceSelectorComponent,
            labelComponent: labelComponent,
            selectComponent: selectComponent,
            visible: isRecurrenceLayoutVisible,
            firstDayOfWeek: firstDayOfWeek
          });
        })
      ),
      createElement(Template, { name: 'tooltip' }, function(params) {
        return createElement(TemplateConnector, null, function(getters, _a) {
          var startEditAppointment = _a.startEditAppointment;
          return createElement(TemplatePlaceholder, {
            params: __assign(__assign({}, params), {
              onOpenButtonClick: function() {
                _this.openFormHandler(params.appointmentMeta.data);
                callActionIfExists(
                  startEditAppointment,
                  params.appointmentMeta.data
                );
              }
            })
          });
        });
      }),
      createElement(Template, { name: 'appointment' }, function(params) {
        return createElement(TemplateConnector, null, function(getters, _a) {
          var startEditAppointment = _a.startEditAppointment;
          return createElement(TemplatePlaceholder, {
            params: __assign(__assign({}, params), {
              onClick: function() {
                _this.openFormHandler(params.data);
                callActionIfExists(startEditAppointment, params.data);
              }
            })
          });
        });
      }),
      createElement(Template, { name: 'cell' }, function(params) {
        return createElement(TemplateConnector, null, function(getters, _a) {
          var addAppointment = _a.addAppointment;
          return addDoubleClickToCell(
            undefined,
            params.startDate,
            params.endDate,
            isAllDayCell(params.startDate, params.endDate),
            _this.openFormHandler,
            addAppointment,
            params
          );
        });
      }),
      createElement(Template, { name: 'allDayPanelCell' }, function(params) {
        return createElement(TemplateConnector, null, function(getters, _a) {
          var addAppointment = _a.addAppointment;
          return addDoubleClickToCell(
            undefined,
            params.startDate,
            params.endDate,
            true,
            _this.openFormHandler,
            addAppointment,
            params
          );
        });
      })
    );
  };
  AppointmentFormBase.defaultProps = {
    messages: {},
    readOnly: false,
    onVisibilityChange: function() {
      return undefined;
    },
    onAppointmentDataChange: function() {
      return undefined;
    }
  };
  AppointmentFormBase.components = {
    overlayComponent: 'Overlay',
    layoutComponent: 'Layout',
    commandLayoutComponent: 'CommandLayout',
    commandButtonComponent: 'CommandButton',
    basicLayoutComponent: 'BasicLayout',
    textEditorComponent: 'TextEditor',
    labelComponent: 'Label',
    dateEditorComponent: 'DateEditor',
    booleanEditorComponent: 'BooleanEditor',
    selectComponent: 'Select',
    recurrenceLayoutComponent: 'RecurrenceLayout',
    radioGroupComponent: 'RadioGroup',
    weeklyRecurrenceSelectorComponent: 'WeeklyRecurrenceSelector',
    resourceEditorComponent: 'ResourceEditor',
    containerComponent: 'Container'
  };
  return AppointmentFormBase;
})(PureComponent);
// tslint:disable-next-line: max-line-length
/** The AppointmentForm plugin renders a form that visualizes appointment’s data and allows a user to modify this data. */
var AppointmentForm = AppointmentFormBase;

var renderAppointmentItems = function(items, Wrapper, draftData) {
  return items.length > 0
    ? createElement(
        Wrapper,
        null,
        items.map(function(draftAppointment, index) {
          return createElement(TemplatePlaceholder, {
            name: 'draftAppointment',
            key: index.toString(),
            params: { data: draftData, draftAppointment: draftAppointment }
          });
        })
      )
    : null;
};
var pluginDependencies$6 = [
  { name: 'EditingState' },
  { name: 'Appointments' },
  { name: 'EditRecurrenceMenu', optional: true },
  { name: 'IntegratedEditing', optional: true },
  { name: 'DayView', optional: true },
  { name: 'WeekView', optional: true },
  { name: 'MonthView', optional: true },
  { name: 'AllDayPanel', optional: true }
];
var DragDropProviderBase = /*#__PURE__*/ (function(_super) {
  __extends(DragDropProviderBase, _super);
  function DragDropProviderBase() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.timeTableDraftAppointments = [];
    _this.allDayDraftAppointments = [];
    _this.offsetTimeTop = null;
    _this.appointmentStartTime = null;
    _this.appointmentEndTime = null;
    _this.state = {
      startTime: null,
      endTime: null,
      payload: null,
      isOutside: false
    };
    _this.handleDrop = function(_a) {
      var finishCommitAppointment = _a.finishCommitAppointment;
      return function() {
        finishCommitAppointment();
        _this.resetCache();
      };
    };
    _this.handleLeave = function() {
      _this.setState({ isOutside: true });
    };
    return _this;
  }
  DragDropProviderBase.prototype.onPayloadChange = function(actions) {
    var _this = this;
    return function(args) {
      return _this.handlePayloadChange(args, actions);
    };
  };
  DragDropProviderBase.prototype.calculateNextBoundaries = function(
    getters,
    actions
  ) {
    var _this = this;
    return function(args) {
      return _this.calculateBoundaries(args, getters, actions);
    };
  };
  DragDropProviderBase.prototype.resetCache = function() {
    this.timeTableDraftAppointments = [];
    this.allDayDraftAppointments = [];
    this.offsetTimeTop = null;
    this.appointmentStartTime = null;
    this.appointmentEndTime = null;
    this.setState({
      payload: null,
      startTime: null,
      endTime: null,
      isOutside: false
    });
  };
  DragDropProviderBase.prototype.applyChanges = function(
    startTime,
    endTime,
    payload,
    startEditAppointment,
    changeAppointment
  ) {
    startEditAppointment(payload);
    changeAppointment({
      change: __assign(
        { startDate: startTime, endDate: endTime },
        payload.allDay && { allDay: undefined }
      )
    });
    this.setState({
      startTime: startTime,
      endTime: endTime,
      payload: payload,
      isOutside: false
    });
  };
  DragDropProviderBase.prototype.handlePayloadChange = function(_a, _b) {
    var payload = _a.payload;
    var finishCommitAppointment = _b.finishCommitAppointment;
    var isOutside = this.state.isOutside;
    if (payload || !isOutside) return;
    finishCommitAppointment();
    this.resetCache();
  };
  DragDropProviderBase.prototype.calculateBoundaries = function(_a, _b, _c) {
    var payload = _a.payload,
      clientOffset = _a.clientOffset;
    var viewCellsData = _b.viewCellsData,
      startViewDate = _b.startViewDate,
      endViewDate = _b.endViewDate,
      excludedDays = _b.excludedDays,
      timeTableElementsMeta = _b.timeTableElementsMeta,
      allDayElementsMeta = _b.allDayElementsMeta,
      scrollingStrategy = _b.scrollingStrategy;
    var changeAppointment = _c.changeAppointment,
      startEditAppointment = _c.startEditAppointment;
    if (clientOffset) {
      autoScroll(clientOffset, scrollingStrategy);
    }
    var tableCellElementsMeta = timeTableElementsMeta;
    // AllDayPanel doesn't always exist
    var allDayCellsElementsMeta =
      allDayElementsMeta && allDayElementsMeta.getCellRects
        ? allDayElementsMeta
        : { getCellRects: [] };
    var timeTableIndex = cellIndex(
      tableCellElementsMeta.getCellRects,
      clientOffset
    );
    var allDayIndex = cellIndex(
      allDayCellsElementsMeta.getCellRects,
      clientOffset
    );
    if (allDayIndex === -1 && timeTableIndex === -1) return;
    var targetData = cellData(timeTableIndex, allDayIndex, viewCellsData);
    var targetType = cellType(targetData);
    var insidePart = calculateInsidePart(
      clientOffset.y,
      tableCellElementsMeta.getCellRects,
      timeTableIndex
    );
    var cellDurationMinutes = intervalDuration(targetData, 'minutes');
    var _d = calculateAppointmentTimeBoundaries(
        payload,
        targetData,
        targetType,
        cellDurationMinutes,
        insidePart,
        this.offsetTimeTop
      ),
      appointmentStartTime = _d.appointmentStartTime,
      appointmentEndTime = _d.appointmentEndTime,
      offsetTimeTop = _d.offsetTimeTop;
    this.appointmentStartTime =
      appointmentStartTime || this.appointmentStartTime;
    this.appointmentEndTime = appointmentEndTime || this.appointmentEndTime;
    this.offsetTimeTop = offsetTimeTop;
    var _e = this.state,
      startTime = _e.startTime,
      endTime = _e.endTime;
    if (
      moment(startTime).isSame(this.appointmentStartTime) &&
      moment(endTime).isSame(this.appointmentEndTime)
    )
      return;
    var draftAppointments = [
      {
        dataItem: __assign(__assign({}, payload), {
          startDate: this.appointmentStartTime,
          endDate: this.appointmentEndTime
        }),
        start: this.appointmentStartTime,
        end: this.appointmentEndTime
      }
    ];
    var _f = calculateDraftAppointments(
        allDayIndex,
        draftAppointments,
        startViewDate,
        endViewDate,
        excludedDays,
        viewCellsData,
        allDayCellsElementsMeta,
        targetType,
        cellDurationMinutes,
        tableCellElementsMeta
      ),
      allDayDraftAppointments = _f.allDayDraftAppointments,
      timeTableDraftAppointments = _f.timeTableDraftAppointments;
    this.allDayDraftAppointments = allDayDraftAppointments;
    this.timeTableDraftAppointments = timeTableDraftAppointments;
    this.applyChanges(
      this.appointmentStartTime,
      this.appointmentEndTime,
      payload,
      startEditAppointment,
      changeAppointment
    );
  };
  DragDropProviderBase.prototype.render = function() {
    var _this = this;
    var payload = this.state.payload;
    var _a = this.props,
      Container = _a.containerComponent,
      DraftAppointment = _a.draftAppointmentComponent,
      SourceAppointment = _a.sourceAppointmentComponent,
      Resize = _a.resizeComponent,
      allowDrag = _a.allowDrag,
      allowResize = _a.allowResize;
    var draftData = __assign(__assign({}, payload), {
      startDate: this.appointmentStartTime,
      endDate: this.appointmentEndTime
    });
    return createElement(
      Plugin,
      { name: 'DragDropProvider', dependencies: pluginDependencies$6 },
      createElement(
        Template,
        { name: 'body' },
        createElement(TemplateConnector, null, function(_a, _b) {
          var viewCellsData = _a.viewCellsData,
            startViewDate = _a.startViewDate,
            endViewDate = _a.endViewDate,
            excludedDays = _a.excludedDays,
            timeTableElementsMeta = _a.timeTableElementsMeta,
            allDayElementsMeta = _a.allDayElementsMeta,
            scrollingStrategy = _a.scrollingStrategy;
          var changeAppointment = _b.changeAppointment,
            startEditAppointment = _b.startEditAppointment,
            finishCommitAppointment = _b.finishCommitAppointment;
          var calculateBoundariesByMove = _this.calculateNextBoundaries(
            {
              viewCellsData: viewCellsData,
              startViewDate: startViewDate,
              endViewDate: endViewDate,
              excludedDays: excludedDays,
              timeTableElementsMeta: timeTableElementsMeta,
              allDayElementsMeta: allDayElementsMeta,
              scrollingStrategy: scrollingStrategy
            },
            {
              changeAppointment: changeAppointment,
              startEditAppointment: startEditAppointment
            }
          );
          return createElement(
            DragDropProvider$1,
            {
              onChange: _this.onPayloadChange({
                finishCommitAppointment: finishCommitAppointment
              })
            },
            createElement(
              DropTarget,
              {
                onOver: calculateBoundariesByMove,
                onEnter: calculateBoundariesByMove,
                onDrop: _this.handleDrop({
                  finishCommitAppointment: finishCommitAppointment
                }),
                onLeave: _this.handleLeave
              },
              createElement(TemplatePlaceholder, null)
            )
          );
        })
      ),
      createElement(
        Template,
        {
          name: 'appointmentContent',
          predicate: function(_a) {
            var data = _a.data;
            return allowDrag(data);
          }
        },
        function(_a) {
          var params = __rest(_a, ['styles']);
          return createElement(
            DragSource,
            {
              payload: __assign(__assign({}, params.data), {
                type: params.type
              })
            },
            payload && params.data.id === payload.id
              ? createElement(SourceAppointment, __assign({}, params))
              : createElement(TemplatePlaceholder, {
                  params: __assign(__assign({}, params), { draggable: true })
                })
          );
        }
      ),
      createElement(
        Template,
        {
          name: 'appointmentTop',
          predicate: function(params) {
            return !params.slice && allowResize(params.data);
          }
        },
        function(_a) {
          var data = _a.data,
            type = _a.type;
          return createElement(
            DragSource,
            {
              payload: __assign(__assign({}, data), {
                type: RESIZE_TOP,
                appointmentType: type
              })
            },
            createElement(Resize, {
              position: POSITION_START,
              appointmentType: type
            })
          );
        }
      ),
      createElement(
        Template,
        {
          name: 'appointmentBottom',
          predicate: function(params) {
            return !params.slice && allowResize(params.data);
          }
        },
        function(_a) {
          var data = _a.data,
            type = _a.type;
          return createElement(
            DragSource,
            {
              payload: __assign(__assign({}, data), {
                type: RESIZE_BOTTOM,
                appointmentType: type
              })
            },
            createElement(Resize, {
              position: POSITION_END,
              appointmentType: type
            })
          );
        }
      ),
      createElement(
        Template,
        { name: 'allDayPanel' },
        createElement(TemplatePlaceholder, null),
        renderAppointmentItems(
          this.allDayDraftAppointments,
          Container,
          draftData
        )
      ),
      createElement(
        Template,
        { name: 'timeTable' },
        createElement(TemplatePlaceholder, null),
        renderAppointmentItems(
          this.timeTableDraftAppointments,
          Container,
          draftData
        )
      ),
      createElement(Template, { name: 'draftAppointment' }, function(_a) {
        var data = _a.data,
          draftAppointment = _a.draftAppointment,
          restParams = __rest(_a, ['data', 'draftAppointment']);
        return createElement(TemplateConnector, null, function(_a) {
          var formatDate = _a.formatDate,
            resources = _a.resources,
            plainResources = _a.plainResources;
          var type = draftAppointment.type,
            fromPrev = draftAppointment.fromPrev,
            toNext = draftAppointment.toNext,
            durationType = draftAppointment.durationType,
            geometry = __rest(draftAppointment, [
              'dataItem',
              'type',
              'fromPrev',
              'toNext',
              'durationType'
            ]);
          return createElement(
            DraftAppointment,
            __assign(
              {
                data: data,
                resources: getAppointmentResources(
                  data,
                  resources,
                  plainResources
                ),
                durationType: durationType,
                style: getAppointmentStyle(geometry),
                type: type,
                fromPrev: fromPrev,
                toNext: toNext,
                formatDate: formatDate
              },
              restParams
            )
          );
        });
      })
    );
  };
  DragDropProviderBase.components = {
    containerComponent: 'Container',
    draftAppointmentComponent: 'DraftAppointment',
    sourceAppointmentComponent: 'SourceAppointment',
    resizeComponent: 'Resize'
  };
  DragDropProviderBase.defaultProps = {
    allowDrag: function() {
      return true;
    },
    allowResize: function() {
      return true;
    }
  };
  return DragDropProviderBase;
})(PureComponent);
/** A plugin that enables users to edit appointments via drag-and-drop. */
var DragDropProvider = DragDropProviderBase;

var pluginDependencies$7 = [{ name: 'Toolbar' }, { name: 'ViewState' }];
var defaultMessages$2 = {
  today: 'Today'
};
var TodayButtonBase = /*#__PURE__*/ (function(_super) {
  __extends(TodayButtonBase, _super);
  function TodayButtonBase() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  TodayButtonBase.prototype.render = function() {
    var _a = this.props,
      Button = _a.buttonComponent,
      messages = _a.messages;
    var getMessage = getMessagesFormatter(
      __assign(__assign({}, defaultMessages$2), messages)
    );
    return createElement(
      Plugin,
      { name: 'TodayButton', dependencies: pluginDependencies$7 },
      createElement(
        Template,
        { name: 'toolbarContent' },
        createElement(TemplateConnector, null, function(getters, _a) {
          var changeCurrentDate = _a.changeCurrentDate;
          var setCurrentDate = function(nextDate) {
            return changeCurrentDate({
              nextDate: nextDate
            });
          };
          return createElement(Button, {
            getMessage: getMessage,
            setCurrentDate: setCurrentDate
          });
        }),
        createElement(TemplatePlaceholder, null)
      )
    );
  };
  TodayButtonBase.components = {
    buttonComponent: 'Button'
  };
  return TodayButtonBase;
})(PureComponent);
/** A plugin that renders the Scheduler's button which sets the current date to today's date. */
var TodayButton = TodayButtonBase;

var _a;
var pluginDependencies$8 = [{ name: 'EditingState' }];
var defaultAvailableOperations = [
  { value: RECURRENCE_EDIT_SCOPE.CURRENT },
  { value: RECURRENCE_EDIT_SCOPE.CURRENT_AND_FOLLOWING },
  { value: RECURRENCE_EDIT_SCOPE.ALL }
];
var defaultMessages$3 =
  ((_a = {}),
  (_a[RECURRENCE_EDIT_SCOPE.CURRENT] = 'This appointment'),
  (_a[RECURRENCE_EDIT_SCOPE.CURRENT_AND_FOLLOWING] =
    'This and following appointments'),
  (_a[RECURRENCE_EDIT_SCOPE.ALL] = 'All appointments'),
  (_a.menuEditTitle = 'Edit recurring appointment'),
  (_a.menuDeleteTitle = 'Delete recurring appointment'),
  (_a.cancelButton = 'Cancel'),
  (_a.commitButton = 'OK'),
  _a);
var EditRecurrenceMenuBase = /*#__PURE__*/ (function(_super) {
  __extends(EditRecurrenceMenuBase, _super);
  function EditRecurrenceMenuBase() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.modalContainer = createRef();
    _this.state = {
      isOpen: false,
      deletedAppointmentData: null
    };
    _this.finishCommitAppointment = function(payload, _a, _b) {
      var editingAppointment = _a.editingAppointment;
      var commitChangedAppointment = _b.commitChangedAppointment;
      if (editingAppointment && !editingAppointment.rRule) {
        commitChangedAppointment();
      } else {
        _this.setState({
          isOpen: true,
          deletedAppointmentData: null
        });
      }
    };
    _this.finishDeleteAppointment = function(payload, getters, _a) {
      var commitDeletedAppointment = _a.commitDeletedAppointment;
      if (payload && !payload.rRule) {
        commitDeletedAppointment({ deletedAppointmentData: payload });
      } else {
        _this.setState({
          isOpen: true,
          deletedAppointmentData: payload
        });
      }
    };
    _this.commit = memoize(function(editAction, deleteAction, payload) {
      return function(type) {
        if (payload) {
          deleteAction({ deletedAppointmentData: payload, type: type });
        } else {
          editAction(type);
        }
        _this.closeMenu();
      };
    });
    _this.closeMenu = function() {
      _this.setState({ isOpen: false, deletedAppointmentData: null });
    };
    _this.cancelEditing = memoize(function(cancelAction, stopEditAction) {
      return function() {
        stopEditAction();
        cancelAction();
        _this.closeMenu();
      };
    });
    _this.availableOperations = memoize(function(
      getMessage,
      menuAvailableOperations
    ) {
      return menuAvailableOperations.map(function(_a) {
        var value = _a.value;
        return {
          value: value,
          title: getMessage([value])
        };
      });
    });
    _this.getMessage = memoize(function(messages, menuMessages) {
      return getMessagesFormatter(
        __assign(__assign({}, menuMessages), messages)
      );
    });
    return _this;
  }
  EditRecurrenceMenuBase.prototype.render = function() {
    var _this = this;
    var _a = this.state,
      isOpen = _a.isOpen,
      deletedAppointmentData = _a.deletedAppointmentData;
    var _b = this.props,
      Layout = _b.layoutComponent,
      Overlay = _b.overlayComponent,
      Container = _b.containerComponent,
      buttonComponent = _b.buttonComponent,
      messages = _b.messages;
    var getMessage = this.getMessage(messages, defaultMessages$3);
    var availableOperations = this.availableOperations(
      getMessage,
      defaultAvailableOperations
    );
    return createElement(
      Plugin,
      { name: 'EditRecurrenceMenu', dependencies: pluginDependencies$8 },
      createElement(Action, {
        name: 'finishCommitAppointment',
        action: this.finishCommitAppointment
      }),
      createElement(Action, {
        name: 'finishDeleteAppointment',
        action: this.finishDeleteAppointment
      }),
      createElement(
        Template,
        { name: 'schedulerRoot' },
        createElement(TemplatePlaceholder, null),
        createElement(Container, { ref: this.modalContainer }),
        createElement(TemplatePlaceholder, { name: 'overlay' })
      ),
      createElement(
        Template,
        { name: 'overlay' },
        createElement(TemplateConnector, null, function(getters, _a) {
          var commitChangedAppointment = _a.commitChangedAppointment,
            commitDeletedAppointment = _a.commitDeletedAppointment,
            cancelChangedAppointment = _a.cancelChangedAppointment,
            stopEditAppointment = _a.stopEditAppointment;
          var commit = _this.commit(
            commitChangedAppointment,
            commitDeletedAppointment,
            deletedAppointmentData
          );
          var cancelEditing = _this.cancelEditing(
            cancelChangedAppointment,
            stopEditAppointment
          );
          return createElement(
            Overlay,
            {
              target: _this.modalContainer,
              visible: isOpen,
              onHide: _this.closeMenu
            },
            createElement(Layout, {
              isDeleting: !!deletedAppointmentData,
              buttonComponent: buttonComponent,
              handleClose: cancelEditing,
              commit: commit,
              availableOperations: availableOperations,
              getMessage: getMessage
            })
          );
        })
      )
    );
  };
  EditRecurrenceMenuBase.components = {
    layoutComponent: 'Layout',
    overlayComponent: 'Overlay',
    buttonComponent: 'Button',
    containerComponent: 'Container'
  };
  return EditRecurrenceMenuBase;
})(PureComponent);
/**
 * A plugin that renders the Scheduler's edit menu.
 * Should not be used with the `IntegratedEditing` plugin.
 */
var EditRecurrenceMenu = EditRecurrenceMenuBase;

var pluginDependencies$9 = [{ name: 'EditingState' }];
var IntegratedEditingBase = /*#__PURE__*/ (function(_super) {
  __extends(IntegratedEditingBase, _super);
  function IntegratedEditingBase() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.finishCommitAppointment = function(payload, getters, _a) {
      var commitChangedAppointment = _a.commitChangedAppointment;
      commitChangedAppointment();
    };
    _this.finishDeleteAppointment = function(payload, getters, _a) {
      var commitDeletedAppointment = _a.commitDeletedAppointment;
      commitDeletedAppointment({ deletedAppointmentData: payload });
    };
    return _this;
  }
  IntegratedEditingBase.prototype.render = function() {
    return createElement(
      Plugin,
      { name: 'IntegratedEditing', dependencies: pluginDependencies$9 },
      createElement(Action, {
        name: 'finishCommitAppointment',
        action: this.finishCommitAppointment
      }),
      createElement(Action, {
        name: 'finishDeleteAppointment',
        action: this.finishDeleteAppointment
      })
    );
  };
  IntegratedEditingBase.defaultProps = {
    totalCount: 0
  };
  return IntegratedEditingBase;
})(PureComponent);
/** A plugin that allows implementing a editing calculation logic. */
var IntegratedEditing = IntegratedEditingBase;

var pluginDependencies$a = [{ name: 'Appointments' }];
var ResourcesBase = function(_a) {
  var data = _a.data,
    mainResourceName = _a.mainResourceName,
    palette = _a.palette;
  var convertResources = function(_a) {
    var resources = _a.resources;
    return convertResourcesToPlain(resources);
  };
  return createElement(
    Plugin,
    { name: 'Resources', dependencies: pluginDependencies$a },
    createElement(Getter, {
      name: 'resources',
      value: validateResources(data, mainResourceName, palette)
    }),
    createElement(Getter, {
      name: 'plainResources',
      computed: convertResources
    }),
    createElement(Template, { name: 'appointment' }, function(params) {
      return createElement(TemplateConnector, null, function(_a) {
        var resources = _a.resources,
          plainResources = _a.plainResources;
        return createElement(TemplatePlaceholder, {
          params: __assign(__assign({}, params), {
            resources: getAppointmentResources(
              params.data,
              resources,
              plainResources
            )
          })
        });
      });
    })
  );
};
/** A plugin that manages schedule's resources. */
var Resources = ResourcesBase;

var defaultMessages$4 = {
  discardButton: 'Discard',
  deleteButton: 'Delete',
  cancelButton: 'Cancel',
  confirmDeleteMessage: 'Are you sure you want to delete this appointment?',
  confirmCancelMessage: 'Discard unsaved changes?'
};
var pluginDependencies$b = [
  { name: 'EditingState' },
  { name: 'EditRecurrenceMenu', optional: true },
  { name: 'IntegratedEditing', optional: true }
];
var ACTION_TYPES = {
  CANCEL: 'cancel',
  DELETE: 'delete'
};
var ConfirmationDialogBase = function(_a) {
  var messages = _a.messages,
    Overlay = _a.overlayComponent,
    Layout = _a.layoutComponent,
    Container = _a.containerComponent,
    buttonComponent = _a.buttonComponent,
    ignoreDelete = _a.ignoreDelete,
    ignoreCancel = _a.ignoreCancel;
  var getMessage = getMessagesFormatter(
    __assign(__assign({}, defaultMessages$4), messages)
  );
  var modalContainer = useRef();
  var _b = __read(useState(false), 2),
    visible = _b[0],
    setVisible = _b[1];
  var _c = __read(useState(''), 2),
    actionType = _c[0],
    setActionType = _c[1];
  var _d = __read(useState(''), 2),
    hideActionName = _d[0],
    setHideActionName = _d[1];
  var _e = __read(useState({}), 2),
    appointmentData = _e[0],
    setAppointmentData = _e[1];
  var toggleVisibility = useCallback(
    function() {
      setVisible(!visible);
    },
    [visible, setVisible]
  );
  var confirmCancelChanges = useCallback(
    function(hideAction) {
      toggleVisibility();
      setHideActionName(hideAction);
      setActionType(ACTION_TYPES.CANCEL);
    },
    [toggleVisibility, setHideActionName, setActionType]
  );
  var confirmDelete = useCallback(
    function(_a) {
      var hideAction = _a.hideActionName,
        changedAppointment = _a.appointmentData;
      toggleVisibility();
      setHideActionName(hideAction);
      setActionType(ACTION_TYPES.DELETE);
      setAppointmentData(changedAppointment);
    },
    [toggleVisibility, setHideActionName, setActionType, setAppointmentData]
  );
  var confirmAction = useCallback(
    function(
      isNewAppointment,
      hideEditor,
      stopEditAppointment,
      finishDeleteAppointment,
      cancelAddedAppointment,
      cancelChangedAppointment
    ) {
      return function() {
        hideEditor();
        toggleVisibility();
        if (isNewAppointment) {
          cancelAddedAppointment();
        } else {
          stopEditAppointment();
          cancelChangedAppointment();
        }
        if (actionType === ACTION_TYPES.DELETE) {
          finishDeleteAppointment(appointmentData);
        }
      };
    },
    [toggleVisibility, actionType, appointmentData]
  );
  return createElement(
    Plugin,
    { name: 'ConfirmationDialog', dependencies: pluginDependencies$b },
    !ignoreCancel &&
      createElement(Action, {
        name: 'openCancelConfirmationDialog',
        action: confirmCancelChanges
      }),
    !ignoreDelete &&
      createElement(Action, {
        name: 'openDeleteConfirmationDialog',
        action: confirmDelete
      }),
    createElement(
      Template,
      { name: 'schedulerRoot' },
      createElement(TemplatePlaceholder, null),
      createElement(Container, { ref: modalContainer }),
      createElement(TemplatePlaceholder, { name: 'confirmationDialogOverlay' })
    ),
    createElement(
      Template,
      { name: 'confirmationDialogOverlay' },
      createElement(TemplateConnector, null, function(_a, actions) {
        var editingAppointment = _a.editingAppointment;
        var handleConfirm = confirmAction(
          !editingAppointment,
          actions[hideActionName],
          actions.stopEditAppointment,
          actions.finishDeleteAppointment,
          actions.cancelAddedAppointment,
          actions.cancelChangedAppointment
        );
        return createElement(
          Overlay,
          {
            target: modalContainer,
            visible: visible,
            onHide: toggleVisibility
          },
          createElement(Layout, {
            buttonComponent: buttonComponent,
            handleCancel: toggleVisibility,
            handleConfirm: handleConfirm,
            getMessage: getMessage,
            isDeleting: actionType === ACTION_TYPES.DELETE,
            appointmentData: appointmentData
          })
        );
      })
    )
  );
};
ConfirmationDialogBase.components = {
  overlayComponent: 'Overlay',
  containerComponent: 'Container',
  layoutComponent: 'Layout',
  buttonComponent: 'Button'
};
ConfirmationDialogBase.defaultProps = {
  ignoreCancel: false,
  ignoreDelete: false
};
// tslint:disable-next-line: max-line-length
/** A plugin that renders the dialog which allows users to confirm or to discard delete and cancel appointment actions. */
var ConfirmationDialog = ConfirmationDialogBase;

var pluginDependencies$c = [
  { name: 'DayView', optional: true },
  { name: 'WeekView', optional: true },
  { name: 'MonthView', optional: true },
  { name: 'DragDropProvider', optional: true },
  { name: 'Appointments', optional: true }
];
var CurrentTimeIndicatorBase = function(_a) {
  var indicatorComponent = _a.indicatorComponent,
    shadePreviousAppointments = _a.shadePreviousAppointments,
    shadePreviousCells = _a.shadePreviousCells,
    updateInterval = _a.updateInterval;
  var _b = __read(useState(Date.now), 2),
    currentTime = _b[0],
    setCurrentTime = _b[1];
  var _c = __read(useState(undefined), 2),
    indicatorUpdateTimer = _c[0],
    setIndicatorUpdateTimer = _c[1];
  useEffect(
    function() {
      clearInterval(indicatorUpdateTimer);
      setIndicatorUpdateTimer(
        setInterval(function() {
          setCurrentTime(Date.now());
        }, updateInterval)
      );
      return function() {
        return clearInterval(indicatorUpdateTimer);
      };
    },
    [indicatorUpdateTimer, setCurrentTime, setIndicatorUpdateTimer, updateInterval]
  );
  return createElement(
    Plugin,
    { name: 'CurrentTimeIndicator', dependencies: pluginDependencies$c },
    createElement(
      Template,
      {
        name: 'cell',
        predicate: function(_a) {
          var otherMonth = _a.otherMonth;
          return !isMonthCell(otherMonth);
        }
      },
      function(params) {
        return createElement(TemplatePlaceholder, {
          params: __assign(__assign({}, params), {
            currentTimeIndicatorPosition: getCurrentTimeIndicatorTop(
              params,
              currentTime
            ),
            currentTimeIndicatorComponent: indicatorComponent
          })
        });
      }
    ),
    createElement(Template, { name: 'cell' }, function(params) {
      return createElement(TemplatePlaceholder, {
        params: __assign(__assign({}, params), {
          isShaded: isCellShaded(params, currentTime, shadePreviousCells)
        })
      });
    }),
    createElement(Template, { name: 'appointmentContent' }, function(params) {
      return createElement(TemplatePlaceholder, {
        params: __assign(__assign({}, params), {
          isShaded: isShadedAppointment(
            params,
            currentTime,
            shadePreviousAppointments
          )
        })
      });
    }),
    createElement(Template, { name: 'draftAppointment' }, function(params) {
      return createElement(TemplatePlaceholder, {
        params: __assign(__assign({}, params), {
          isShaded: isShadedAppointment(
            params,
            currentTime,
            shadePreviousAppointments
          )
        })
      });
    })
  );
};
CurrentTimeIndicatorBase.defaultProps = {
  updateInterval: 60000,
  shadePreviousCells: false,
  shadePreviousAppointments: false
};
CurrentTimeIndicatorBase.components = {
  indicatorComponent: 'Indicator'
};
// tslint:disable-next-line: max-line-length
/** A plugin that renders the current time indicator and the shading that covers appointments and timetable cells up to the current time. */
var CurrentTimeIndicator = CurrentTimeIndicatorBase;

export {
  AllDayPanel,
  AppointmentForm,
  AppointmentTooltip,
  Appointments,
  ConfirmationDialog,
  CurrentTimeIndicator,
  DateNavigator,
  DayView,
  DragDropProvider,
  EditRecurrenceMenu,
  EditingState,
  IntegratedEditing,
  MonthView,
  Resources,
  Scheduler,
  TodayButton,
  Toolbar,
  ViewState,
  ViewSwitcher,
  WeekView
};
//# sourceMappingURL=dx-react-scheduler.es.js.map
