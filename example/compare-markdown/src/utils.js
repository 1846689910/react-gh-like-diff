import { unifiedDiff } from "difflib";
import { format } from "util";
import { createTwoFilesPatch } from "diff";

/**
 *
 * @param {string} past
 * @param {string} current
 * @param {string} oldFileName
 * @param {string} newFileName
 */
export const getUnifiedDiffFromDiffLib = (
  past,
  current,
  oldFileName,
  newFileName
) => {
  const pastArray = past.split(/\r|\n|\r\n/);
  const currentArray = current.split(/\r|\n|\r\n/);
  const diffArray = unifiedDiff(pastArray, currentArray, {
    fromfile: oldFileName,
    tofile: newFileName
  });
  const diffString = format(
    "diff --git %s %s\n%s",
    oldFileName,
    newFileName,
    diffArray.join("\n")
  );
  return diffString;
};

/**
 *
 * @param {string} past
 * @param {string} current
 * @param {string} oldFileName
 * @param {string} newFileName
 */
export const getUnifiedDiffFromJsDiff = (
  past,
  current,
  oldFileName,
  newFileName
) => {
  const formatedStr = createTwoFilesPatch(
    oldFileName,
    newFileName,
    past,
    current
  );
  return formatedStr;
};
