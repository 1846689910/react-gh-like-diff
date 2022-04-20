import * as Diff2Html from "diff2html";
import PropTypes from "prop-types";
import { get } from "lodash";
import "diff2html/bundles/css/diff2html.min.css";
import { getUnifiedDiffFromDiffLib, getUnifiedDiffFromJsDiff } from "./utils";

export const defaultOptions = {
  originalFileName: "Unknown-File-Name",
  updatedFileName: "Unknown-File-Name",
  inputFormat: "diff",
  outputFormat: "side-by-side",
  showFiles: false,
  matching: "none",
  matchWordsThreshold: 0.25,
  matchingMaxComparisons: 2500,
  maxLineSizeInBlockForComparison: 200,
  maxLineLengthHighlight: 10000,
  renderNothingWhenEmpty: false
};

export default function ReactDiff2Html({
  past = "",
  current = "",
  options = {}
}) {
  if (typeof past !== "string") throw new Error("past must be a string");
  if (typeof current !== "string") throw new Error("current must be a string");
  const useOptions = { ...defaultOptions, ...options };

  const oldFileName = get(useOptions, "originalFileName");
  const newFileName = get(useOptions, "updatedFileName");

  const formatedStr = getUnifiedDiffFromJsDiff(
    past,
    current,
    oldFileName,
    newFileName
  );

  const formatedStr1 = getUnifiedDiffFromDiffLib( // TODO: if use this formatedStr, cannot work, show Files changed(0)
    past,
    current,
    oldFileName,
    newFileName
  );

  const diffStr = Diff2Html.html(formatedStr, useOptions);

  return <div dangerouslySetInnerHTML={{ __html: diffStr }} />;
}
ReactDiff2Html.propTypes = {
  past: PropTypes.string,
  current: PropTypes.string,
  options: PropTypes.object
};
